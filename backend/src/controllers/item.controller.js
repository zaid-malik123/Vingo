import Item from "../models/items.model.js";
import Shop from "../models/shop.model.js";
import { uploadImage } from "../service/imageKit.service.js";

export const addItem = async (req, res, next) => {
  try {
    const { name, category, foodType, price } = req.body;

    let image;

    if (req.file) {
      image = await uploadImage(req.file);
    }

    const shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      res.status(400).json({ message: "Shop not found" });
    }

    const item = await Item.create({
      name,
      category,
      foodType,
      price,
      image: image.url,
      shop: shop._id,
    });
    shop.items.push(item._id);
    await shop.save();
    await shop.populate("items owner");
    return res.status(201).json({ shop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editItem = async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, foodType, price } = req.body;

    // update data ek object me rakho
    const updateData = { name, category, foodType, price };

    // agar naya image aaya hai to hi updateData me daalo
    if (req.file) {
      const uploadedImg = await uploadImage(req.file);
      updateData.image = uploadedImg.url;
    }

    const item = await Item.findByIdAndUpdate(itemId, updateData, {
      new: true,
    });

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    const shop = await Shop.findOne({ owner: req.userId }).populate("items");

    return res.status(200).json({ shop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findByIdAndDelete(itemId);

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    const shop = await Shop.findOne({ owner: req.userId });

    shop.items = shop.items.filter((i) => i != item._id);

    await shop.save();

    await shop.populate("items");

    return res.status(200).json({ shop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findSingleItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(400).json({ message: "item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItemByCity = async (req, res, next) => {
  try {
    const { city } = req.params;

    if (!city) return;

    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    }).populate("items");

    if (!shops) {
      return res.status(400).json({ message: "shops not found" });
    }

    const shopIds = shops.map((s) => s._id);

    const items = await Item.find({ shop: { $in: shopIds } });

    return res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItemsByShop = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const shop = await Shop.findById(shopId).populate("items");

    if (!shop) {
      return res.status(400).json({ message: "shop not available" });
    }

    return res.status(200).json({
      shop,
      items: shop.items,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchItems = async (req, res) => {
  try {
    const { query, city } = req.query;

    // If both missing
    if (!query && !city) {
      return res.status(400).json({ message: "Query or city required" });
    }

    // Find shops by city (case-insensitive)
    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    }).populate("items");

    if (!shops.length) {
      return res.status(404).json({ message: "Shops not found" });
    }

    // Get shop ids
    const shopIds = shops.map((s) => s._id);

    // Find items by query in name or category
    const items = await Item.find({
      shop: { $in: shopIds },
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).populate("shop", "name image");

    return res.status(200).json(items);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

