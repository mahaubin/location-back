import mongoose from "mongoose";
const TenantSchema = new mongoose.Schema(
  {
    userId: {
    type: String,
    required: true,
    },
    belongingsId: {
      type: String,
      required: true,
      },
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    telephone: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Tenant", TenantSchema);