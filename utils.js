const getFlagIndex = (flag, args) => {
  switch (flag) {
    case "help":
      const hFlagIndex = args.indexOf("-h");
      const helpFlagIndex = args.indexOf("--help");
      if (hFlagIndex !== -1) return hFlagIndex;
      if (helpFlagIndex !== -1) return helpFlagIndex;
      break;

    case "proxy":
      const pFlagIndex = args.indexOf("-p");
      const proxyFlagIndex = args.indexOf("--proxy");
      if (pFlagIndex !== -1) return pFlagIndex;
      if (proxyFlagIndex !== -1) return proxyFlagIndex;
      break;
  }

  return -1;
};

const printHelp = () => {
  console.log("cli [options] <...commands>");
  console.log("-p --proxy    The proxy URI. Defaults to http://localhost:3000");
  console.log("-h --help     Prints this message");
};

module.exports = {
  getFlagIndex,
  printHelp,
};
