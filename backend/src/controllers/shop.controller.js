import { uploadImage } from "../service/imageKit.service.js";
import Shop from "../models/shop.model.js";
import Item from "../models/items.model.js";

export const createShop = async (req, res, next) => {
  try {
    const { name, city, state, address } = req.body;

    let image;
    if (req.file) {
      image = await uploadImage(req.file);
    }

    let shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      // Create new shop
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image: image?.url,
        owner: req.userId,
      });
    } else {
      // Update existing shop
      shop = await Shop.findByIdAndUpdate(
        shop._id,
        {
          name,
          city,
          state,
          address,
          image: image?.url || shop.image, // preserve old image if no new one
        },
        { new: true }
      );
    }

    await shop.populate("owner items");

    return res.status(200).json({
      shop
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyShop = async (req, res, next)=>{
  try {
    const shop = await Shop.findOne({owner: req.userId}).populate("owner items")

    if(!shop){
      return null
    }

   res.status(200).json({shop})

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}