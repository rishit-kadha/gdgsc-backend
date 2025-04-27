const mongoose = require("mongoose");
const StatsSchema = mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  exp: { type: Number },
  rank: {
    type: String,
    enum: ["bronze", "silver", "gold", "diamond", "platinum", "emerald"],
    default: "bronze",
  },
});
const Stats = mongoose.model("Stats", StatsSchema);
module.exports = { Stats, StatsSchema };
