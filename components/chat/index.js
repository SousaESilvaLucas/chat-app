const { stockService } = require('../stock');
const Queue = require('../queue');
module.exports = async function initializeChat(server) {
  const io = require('socket.io')(server);
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', handleChatMessage);
    socket.on('add user', handleAddUser);
  });

  const receiveStockQueue = await Queue.build('amqp://localhost', 'receiveStockQueue');
  receiveStockQueue.processQueue(processReceiveStock);
  // *******************
  async function handleChatMessage(nickname, message) {
    // initializes the queue
    const requestStockQueue = await Queue.build('amqp://localhost', 'requestStockQueue');
    if (message.startsWith('/stock')) {
      const [, stockCode] = message.split('=');
      await requestStockQueue.sendTask(JSON.stringify({ task: 'getStock', params: { stockCode } }));
    } else {
      io.emit('chat message', nickname, message);
    }
  }

  function handleAddUser(nickname) {
    io.emit('add user', `${nickname} has joined the chat!`);
  }

  function processReceiveStock(message) {
    const { task, params } = JSON.parse(message.content);
    if (task == 'receiveStock') {
      const { stock } = params;
      io.emit('chat message', 'Stockbot', `${stock.Symbol} quote is $${stock.Close} per share`);
    }
  }
};
