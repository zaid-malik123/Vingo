import User from "./models/user.model.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("identity", async (payload) => {
      // payload ho sakta hai { userId: "..." }
      const userId = typeof payload === "string" ? payload : payload.userId;
      try {
        await User.findByIdAndUpdate(
          userId,
          {
            socketId: socket.id,
            isOnline: true,
          },
          { new: true }
        );
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("updateLocation", async ({ latitude, longitude, userId }) => {
      try {
        if (!latitude || !longitude || !userId) return; 

        const user = await User.findByIdAndUpdate(
          userId,
          {
            location: {
              type: "Point",
              coordinates: [longitude, latitude], 
            },
            isOnline: true,
            socketId: socket.id,
          },
          { new: true } 
        );

        if (user) {
          io.emit("updateDeliveryLocation", {
            deliveryBoyId: userId,
            latitude,
            longitude,
          });
        }
      } catch (error) {
        console.error("Error updating location:", error);
      }
    });

    socket.on("disconnect", async () => {
      try {
        await User.findOneAndUpdate(
          { socketId: socket.id }, // yahan object sahi hai
          {
            socketId: null,
            isOnline: false,
          }
        );
      } catch (error) {
        console.log(error);
      }
    });
  });
};
