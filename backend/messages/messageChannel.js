require('dotenv').config();
const amqp = require('amqplib');

async function createMessageChannel(message) {
  try {
    // Connect RabbitMQ
    const connection = await amqp.connect(process.env.AMQP_SERVER);
    const channel = await connection.createChannel();

    // Definir a troca (exchange) e a fila (queue)
    const exchange = 'user_created';
    const queue = process.env.QUEUE_NAME;

    // Configurar a troca e a fila
    await channel.assertExchange(exchange, 'fanout', { durable: false });
    await channel.assertQueue(queue, { durable: false });
    await channel.bindQueue(queue, exchange, '');

    // Publicar a mensagem com os dados do usuário
    channel.publish(exchange, '', Buffer.from(message));

    // Close RabbitMQ
    await channel.close();
    await connection.close();
  } catch (error) {
    console.log('Error while trying to connect to RabbitMQ');
    console.log(error);
    return null;
  }
}

module.exports = createMessageChannel;
