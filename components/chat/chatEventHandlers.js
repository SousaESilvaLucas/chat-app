module.exports = {
  handleAddUser,
  handleChatMessage,
};

// **********************************************

async function handleChatMessage(nickname, message) {
  if (message.startsWith('/stock')) {
    const [, stockCode] = message.split('=');
    console.log(stockCode);
    const stock = await stockService.getStock(stockCode);
  } else {
    io('chat message', nickname, message);
  }
}

function handleAddUser(nickname) {
  io.emit('add user', `${nickname} has joined the chat!`);
}
