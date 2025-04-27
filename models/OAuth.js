const mongoose = require("mongoose");
const OAuthSchema = mongoose.Schema({
  userID: { type: String, required: true },
  provider: { type: String, enum: ["google", "discord"], required: true },
  providerAccountID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const OAuth = mongoose.model("OAuth", OAuthSchema);
module.exports = { OAuth, OAuthSchema };
