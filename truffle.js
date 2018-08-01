var HDWalletProvider = require("truffle-hdwallet-provider");
//var mnemonic = "universe ocean tilt cinnamon desert truck letter place news noodle civil favorite snap fox excuse";
var mnemonic = "...";

module.exports = {
  networks: {
    mainnet: {
      provider: new HDWalletProvider(mnemonic, "https://mainnet.infura.io/9S3haS0cNcapDEHbPINr"),
      network_id: 1
    }   
  }
};