var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "...";

module.exports = {
  networks: {
    mainnet: {
      provider: new HDWalletProvider(mnemonic, `https://mainnet.infura.io/${process.env.INFURA}`),
      network_id: 1
    }   
  }
};