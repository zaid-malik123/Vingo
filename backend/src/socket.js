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
