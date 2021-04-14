const { csvService } = require('../csv');
const axios = require('axios');

module.exports = { getStock };
// **********************************************
async function getStock(stockCode) {
  stockCode = stockCode.trim().toLowerCase();
  const options = {
    method: 'get',
    url: `https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`,
  };
  const response = await axios(options);
  const stockInfo = response.data;
  const stock = parseStockInfo(stockInfo);
  return stock;
}

function parseStockInfo(stockInfo) {
  const stock = csvService.parseFile(stockInfo);
  return stock;
}
