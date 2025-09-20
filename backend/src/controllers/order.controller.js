import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import User from "../models/user.model.js";

export const placeOrder = async (req, res) => {
  try {
    const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body;
    if (cartItems.length == 0 || !cartItems) {
      return res.status(400).json({ message: "cart is empty" });
    }

    if (
      !deliveryAddress.text ||
      !deliveryAddress.latitude ||
      !deliveryAddress.longitude
    ) {
      return res
        .status(400)
        .json({ message: "send complete delivery address" });
    }

    const groupItemsByShop = {};

    cartItems.map((elem) => {
      const shopId = elem.shop;

      if (!groupItemsByShop[shopId]) {
        groupItemsByShop[shopId] = [];
      }

      groupItemsByShop[shopId].push(elem);
    });

    const shopOrders = await Promise.all(
      Object.keys(groupItemsByShop).map(async (shopId) => {
        const shop = await Shop.findById(shopId).populate("owner");
        if (!shop) {
          return res.status(400).json({ message: "shop not found" });
        }

        const items = groupItemsByShop[shopId];

        // ✅ Correct subtotal calculation
        const subtotal = items.reduce(
          (sum, i) => sum + Number(i.price) * Number(i.quantity),
          0
        );

        return {
          shop: shop._id,
          owner: shop.owner._id,
          subtotal,
          shopOrderItems: items.map((i) => ({
            item: i.id,
            price: i.price,
            name: i.name,
            quantity: i.quantity,
          })),
        };
      })
    );

    const newOrder = await Order.create({
      user: req.userId,
      paymentMethod,
      deliveryAddress,
      totalAmount,
      shopOrders,
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMyOrders = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: no userId" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "user") {
      const orders = await Order.find({ user: req.userId })
        .sort({ createdAt: -1 })
        .populate("shopOrders.shop", "name")
        .populate("shopOrders.owner", "name email mobileNo")
        .populate("shopOrders.shopOrderItems.item", "name image price");

      return res.status(200).json({ orders });
    }

    if (user.role === "owner") {
      const orders = await Order.find({ "shopOrders.owner": req.userId })
        .sort({ createdAt: -1 })
        .populate("shopOrders.shop", "name")
        .populate("user")
        .populate("shopOrders.shopOrderItems.item", "name image price");

      return res.status(200).json({ orders });
    }

    res.status(400).json({ message: "Invalid role" });
  } catch (error) {
    console.error("getMyOrders error:", error);
    res.status(500).json({ message: error.message });
  }
};


