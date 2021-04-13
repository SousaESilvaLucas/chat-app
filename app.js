const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.post('/join', (req, res) => {
  try {
    const users = [];
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
module.exports = app;
