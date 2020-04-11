const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommandRequestSchema = new Schema({
  command: String,
  ip: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CommandRequest", CommandRequestSchema);
