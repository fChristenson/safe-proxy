const express = require("express");
const policies = require("./policies");
const { getIp, allowCommand, runCommand } = require("./utils");
const CommandRequest = require("./CommandRequestModel");
const ApprovalRequest = require("./ApprovalRequestModel");
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname);
app.use(express.urlencoded());

app.get("/command", async (req, res) => {
  const command = req.query.c;
  const ip = getIp(req);
  const commandRequest = await new CommandRequest({ command, ip }).save();

  const policy = policies.find(allowCommand(command));
  if (!policy) return res.end(`Command is not allowed: ${command}`);

  if (policy.needsApproval) {
    await new ApprovalRequest({ commandRequest, policy }).save();
    return res.end(`Approval request sent for: ${command}`);
  }

  runCommand(command, (err, result) => {
    return res.end(err || result);
  });
});

app.get("/approve", async (req, res) => {
  const approvals = await ApprovalRequest.find({}).sort({ createdAt: "desc" });
  res.render("admin", { approvals });
});

app.post("/approve", async (req, res) => {
  const approval = await ApprovalRequest.findById(req.body.id);

  if (!approval) return res.end("No approval found for: ", req.body.id);

  runCommand(approval.commandRequest.command, async (err, result) => {
    const ip = getIp(req);
    approval.approvedBy = ip;
    approval.result = err || result;
    await approval.save();
    res.redirect("/approve");
  });
});

module.exports = app;
