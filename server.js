const app = require('./app');
const http = require('http');

const server = http.createServer(app);

// Initializes the chat
require('./components/chat')(server);

runServer();

// **********************************************
async function runServer() {
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });
}
