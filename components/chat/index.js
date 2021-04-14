const { stockService } = require('../stock');
const Queue = require('../queue');
module.exports = async function initializeChat(server) {
  const requestStockQueue = await Queue.build('amqp://localhost', 'requestStockQueue');
  const receiveStockQueue = await Queue.build('amqp://localhost', 'receiveStockQueue');
  const io = require('socket.io')(server);
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', handleChatMessage);
    socket.on('add user', handleAddUser);
  });

  // *******************
  async function handleChatMessage(nickname, message) {
    // initializes the queue
    if (message.startsWith('/stock')) {
      const [, stockCode] = message.split('=');
      await requestStockQueue.sendTask(JSON.stringify({ task: 'getStock', params: { stockCode } }));
      // const stock = await stockService.getStock(stockCode);
    } else {
      io.emit('chat message', nickname, message);
    }
  }

  function handleAddUser(nickname) {
    io.emit('add user', `${nickname} has joined the chat!`);
  }
};
