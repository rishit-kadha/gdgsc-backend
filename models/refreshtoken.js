import mongoose from "mongoose";

const refreshTokkenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: String, ref: "User", required: true },
  device: { type: String, required: true }, //unique per device
  issuedAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokkenSchema);
export default RefreshToken;
