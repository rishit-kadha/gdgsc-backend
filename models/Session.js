const mongoose = require("mongoose");
const SessionSchema = mongoose.Schema({
  userID: { type: String, required: true },
  token: { type: String, required: true, unique: true },
});
