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

    const shop = await Shop.findOne({ owner: req.userId })

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
    shop.items.push(item._id)
    await shop.save()
    await shop.populate("items owner") 
    return res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editItem = async (req, res, next) => {
  try {
    const itemId = req.params.itemId;

    const { name, category, foodType, price } = req.body;

    let image;

    if (req.file) {
      image = await uploadImage(req.file);
    }

    const item = await Item.findByIdAndUpdate(itemId, {
      name,
      category,
      foodType,
      price,
      image: image.url,
    },{new:true});

    if(!item){
      res.status(400).json({ message: "Item not found" });
    }

   return res.status(200).json(item);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findSingleItem = async (req, res, next)=>{
try {
  const {itemId} = req.params;

  const item = await Item.findById(itemId)

  if(!item){
    return res.status(400).json({message: "item not found"})
  }

  res.status(200).json(item)
} catch (error) {
  res.status(500).json({ message: error.message });
}
}
