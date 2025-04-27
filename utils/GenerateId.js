const crypto = require("crypto");
const GenerateId = async (Model, field, maxAttempts = 20) => {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const id = crypto.randomUUID();
    const match = await Model.findOne({ [field]: id });
    if (match === null) {
      return id;
    } else {
      attempts++;
    }
  }
  throw new Error("Failed to Generate Id after Max attempts");
};
module.exports = GenerateId;
