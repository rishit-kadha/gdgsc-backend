import mongoose from "mongoose";
const gameSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  rating: { type: Number, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Game", gameSchema);
