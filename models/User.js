const mongoose = require("mongoose");
const { OAuthSchema } = require("./OAuth");
const { StatsSchema } = require("./Stats");

const userSchema = new mongoose.Schema({
  userID: { type: String, unique: true, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  enrollmentNo: {
    type: Number,
    unique: true,
  },
  username: { type: String, default: "" },
  password: { type: String, sparse: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, default: "" },
  avatar: { type: String, default: "" }, //link to the stored pfp
  role: { type: String, enum: ["admin", "mod", "user"], default: "user" },
  OAuths: { type: [OAuthSchema], default: [] },
  stats: { type: StatsSchema },
});

module.exports = mongoose.model("User", userSchema);
