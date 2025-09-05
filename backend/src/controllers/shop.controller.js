import { uploadImage } from "../service/imageKit.service.js"
import Shop from "../models/shop.model.js"
import Item from "../models/items.model.js"

export const createShop = async (req, res, next)=>{
try {
    const {name, city, state, address} = req.body;

    let image;

    if(req.file){
     image = await uploadImage(req.file)
    }

   const shop = await Shop.create({
    name,
    city, 
    state,
    address,
    image: image.url,
    owner: req.userId
   })
   
   await shop.populate("owner")

   return res.status(200).json("shop created successfully")

} catch (error) {
   res.status(500).json({ message: error.message }); 
}
}