const Queue = require('./components/queue');
const { stockService } = require('./components/stock');

runWorker();

// **********************************************
async function runWorker() {
  await initializeQueue();
}

async function initializeQueue() {
  const requestStockQueue = await Queue.build('amqp://localhost', 'requestStockQueue');
  requestStockQueue.processQueue(processRequestStock);
  console.log('Waiting for tasks.');
}

async function processRequestStock(message) {
  const { task, params } = JSON.parse(message.content);
  if (task == 'getStock') {
    const { stockCode } = params;
    const stock = await stockService.getStock(stockCode);
    console.log(stock);
  }
  const receiveStockQueue = await Queue.build('amqp://localhost', 'receiveStockQueue');
}
