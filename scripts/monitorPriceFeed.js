const axios = require("axios");

const Medianizer = artifacts.require('ReadableI');
const MakerDAOPriceFeed = artifacts.require('EthPriceFeedI');

const fs   = require('fs');

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/9S3haS0cNcapDEHbPINr'));

const historyFile = './scripts/historyPriceFeed.csv';

//export INFURA=9S3haS0cNcapDEHbPINr
//truffle exec ./scripts/priceFeedHistory.js --network mainnet
async function getHistory(){

    //Balance3 price - 
    let balanc3_averagePrice = 0;
    var url = "https://exchanges.balanc3.net/prices?from=ETH&to=USD";
    const response = await axios.get(url);
    balanc3_averagePrice = response.data[4].averagePrice; // Print the json response

    //TF rate
    const makerDAOPriceFeedAddress = '0x54bF24e1070784D7F0760095932b47CE55eb3A91';  
    const makerDAOPriceFeed = await MakerDAOPriceFeed.at(makerDAOPriceFeedAddress);

    let tfRate =  await makerDAOPriceFeed.getRate();

    let weiValue = web3.toBigNumber(1000000000000000000);
    const tfDollarEther = weiValue.div(tfRate);

    //MakerDAO price
    const medianizerAddress = '0x729D19f657BD0614b4985Cf1D82531c67569197B';
    const medianizer = await Medianizer.at(medianizerAddress);

    let medianizerPrice = await medianizer.read();

    medianizerPrice = web3.toBigNumber(medianizerPrice);
    medianizerPrice = medianizerPrice.div(1000000000000000000);   

    //Report
    var now = new Date();

    console.log(now+';'+balanc3_averagePrice+';'+medianizerPrice+';'+tfDollarEther);

    fs.appendFile(historyFile, now+';'+balanc3_averagePrice+';'+medianizerPrice+';'+tfDollarEther+'\n', function (err) {
      if (err) throw err;
    });

    setTimeout(getHistory, 1 * 60 * 1000);
  }

module.exports = async (callback) => {

  console.log('Start...');

  getHistory();

};