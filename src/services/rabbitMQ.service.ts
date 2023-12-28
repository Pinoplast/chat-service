// Handles RabbitMQ connections and messaging

import amqp from 'amqplib';
import { rabbitMQConfig } from '../config';
import { Buffer } from 'buffer';

export async function createConnection() {
  try {
    const connection = await amqp.connect(rabbitMQConfig.connectionString);
    return connection;
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
    throw error;
  }
}

export async function consumeMessages(handleMessage: (message: string) => void) {
  try {
    const connection = await createConnection();
    const channel = await connection.createChannel();
    await channel.assertQueue(rabbitMQConfig.inputQueue);
    channel.consume(rabbitMQConfig.inputQueue, (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        handleMessage(messageContent);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error consuming messages:', error);
    throw error;
  }
}

export function sendMessageToOutputQueue(message: string) {
  try {
    amqp.connect(rabbitMQConfig.connectionString).then((connection) => {
      connection.createChannel().then((channel) => {
        channel.assertQueue(rabbitMQConfig.outputQueue);
        channel.sendToQueue(rabbitMQConfig.outputQueue, Buffer.from(message));
      });
    });
  } catch (error) {
    console.error('Error sending message to output queue:', error);
    throw error;
  }
}
