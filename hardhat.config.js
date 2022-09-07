/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv/config");
require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "ropsten",
  networks: {
    hardhat: {},
    ropsten: {
      url: process.env.NEXT_PUBLIC_ROPSTEN_RPCURL,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY],
    }
  },
};
