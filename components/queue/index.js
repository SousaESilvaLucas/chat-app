const amqp = require('amqplib');

module.exports = class Queue {
  constructor(connection, channel, queueName) {
    if (typeof connection === 'undefined' || typeof channel === 'undefined') {
      throw new Error('Cannot be called directly');
    }
    this.connection = connection;
    this.channel = channel;
    this.queue = queueName;
  }

  static async build(connectionUrl, queueName) {
    const connection = await connectToAmqp(connectionUrl);
    const channel = await createChannel(connection);
    await createQueue(channel, queueName);
    return new Queue(connection, channel, queueName);
  }

  async sendMessage(message) {
    await this.channel.sendToQueue(this.queue, Buffer.from(message));
  }

  async processQueue(processFunction) {
    await this.channel.consume(this.queue, processFunction, { noAck: true });
  }
};
// **********************************************
async function connectToAmqp(connectionUrl) {
  const connection = await amqp.connect(connectionUrl);
  return connection;
}

async function createChannel(connection) {
  const channel = await connection.createChannel();
  return channel;
}

async function createQueue(channel, queueName) {
  const result = await channel.assertQueue(queueName, {
    durable: false,
  });
  return result;
}
