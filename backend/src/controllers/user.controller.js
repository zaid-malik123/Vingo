import User from "../models/user.model.js"

export const currUser = async (req, res, next)=>{
    try {
       const id = req.userId;

       const user = await User.findById(id)
       
       if(!user){
        return res.status(400).json({message: "Unauthorized"})
       }

       return res.status(200).json({user})
       
    } catch (error) {
        console.log(error)
    }
}


export const updateUserLocation = async (req, res, next) => {
  try {
    const { lat, lon } = req.body;

    // validate input
    if (typeof lat !== "number" || typeof lon !== "number") {
      return res.status(400).json({ message: "Invalid coordinates" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        location: {
          type: "Point",
          coordinates: [lon, lat], // GeoJSON expects [lng, lat]
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({ message: "Location updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

