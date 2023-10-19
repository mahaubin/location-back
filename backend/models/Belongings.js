import mongoose from "mongoose";
const BelongingsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    rent: {
        type: Number,
        required: true,
    },
    surface: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isBusy: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Belongings", BelongingsSchema);
