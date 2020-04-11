const { exec } = require("child_process");

/**
 * allowCommand is what we would test like mad.
 * If the policy validation logic fails an attacker could run dangerous commands.
 *
 * The team maintaining this project would write A LOT of tests for this function.
 *
 * It would be a good idea to use all levels of the test pyramid on this feature and
 * even use external bug bounty hunters.
 */
const allowCommand = (command) => (policy) => {
  const commandArray = command.split(" ");
  const usesLegalChars = commandArray.every((s) =>
    /[a-zA-Z0-9,\/\.-]+/.test(s)
  );

  if (!usesLegalChars) return undefined;

  if (commandArray[0] !== policy.command) return undefined;

  const flags = commandArray.filter((s) => /-/.test(s));

  for (const flag of flags) {
    if (!policy.flags.includes(flag)) return undefined;
  }

  return policy;
};

const getIp = (req) => {
  return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
};

const runCommand = (command, callback) => {
  console.log(`Running command: ${command}`);
  console.log("--------------------------");
  exec(command, (error, stdin, stderr) => {
    if (error) return callback(error.message);
    return callback(null, stdin || stderr);
  });
};

module.exports = {
  runCommand,
  getIp,
  allowCommand,
};
