import mongoose from "mongoose";

const deliveryAssignmentSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    shopOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    broadcastedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
        type: String,
        enum: ["broadcasted", "assigned","completed"],
        default: "broadcasted"
    },
    acceptedAt: Date
  },
  { timestamps: true }
);

const DeliveryAssignment = mongoose.model("DeliveryAssignment", deliveryAssignmentSchema)
export default DeliveryAssignment