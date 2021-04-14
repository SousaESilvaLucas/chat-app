const { csvService } = require('../csv');
const axios = require('axios');

module.exports = { getStock };
// **********************************************
async function getStock(stockCode) {
  console.log('stockCode', stockCode);
  stockCode = stockCode.trim().toLowerCase();
  const options = {
    method: 'get',
    url: `https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`,
  };
  console.log(options);
  const response = await axios(options);
  const stockInfo = response.data;
  console.log(stockInfo);
  const stock = parseStockInfo(stockInfo);
  console.log(stock);
  return stock;
}

function parseStockInfo(stockInfo) {
  const stock = csvService.parseFile(stockInfo);
  return stock;
}
