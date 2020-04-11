#! /usr/local/bin/node
const axios = require("axios");
const { printHelp, getFlagIndex } = require("./utils");

const defaultProxy = "http://localhost:3000";
const args = process.argv.slice(2).map((c) => c.trim());

const helpFlagIndex = getFlagIndex("help", args);

if (helpFlagIndex !== -1) {
  printHelp();
  process.exit(0);
}

const proxyFlagIndex = getFlagIndex("proxy", args);
const proxy = proxyFlagIndex !== -1 ? args[proxyFlagIndex + 1] : defaultProxy;

const command = encodeURIComponent(args[args.length - 1]);

const url = `${proxy}/command?c=${command}`;

axios
  .get(url)
  .then((res) => console.log(res.data))
  .catch((e) => console.log(e.message));
