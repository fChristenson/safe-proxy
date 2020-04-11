const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApprovalRequestSchema = new Schema({
  commandRequest: Object,
  policy: Object,
  approvedBy: String,
  result: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ApprovalRequest", ApprovalRequestSchema);
