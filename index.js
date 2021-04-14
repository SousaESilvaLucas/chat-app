const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const axios = require('axios');
const parse = require('csv-parse/lib/sync');

app.use(express.json());

const users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.post('/join', (req, res) => {
  try {
    const { nickname } = req.body;
    // saving User in the 'database'
    users.push(nickname);
    const id = users.length;
    res.status(201).json({ status: 'ok', result: { id, nickname } });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Oops, an error has ocurred when registering a new user. Please, try again later',
    });
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', handleChatMessage);
  socket.on('add user', handleAddUser);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// **********************************************
async function handleChatMessage(nickname, message) {
  if (message.startsWith('/stock')) {
    const [stockCommand, stockCode] = message.split('=');
    console.log(stockCode);
    const stock = await getStock(stockCode);
  } else {
    io.emit('chat message', nickname, message);
  }
}

function handleAddUser(nickname) {
  io.emit('add user', `${nickname} has joined the chat!`);
}

async function getStock(stockCode) {
  stockCode = stockCode
    .replace(/(\r\n|\n|\r)/gm, '')
    .trim()
    .toLowerCase();
  console.log('length', stockCode.length);
  console.log(stockCode == 'aapl.us');
  const options = {
    method: 'get',
    // url: `https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`,
    url: `https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`,
  };
  console.log(options);
  const response = await axios(options);
  const stockInfo = response.data;
  const stock = parseStockInfo(stockInfo);
  console.log(stock);
}

function parseStockInfo(stockInfo) {
  const [stock] = parse(stockInfo, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
  });
  return stock;
}
