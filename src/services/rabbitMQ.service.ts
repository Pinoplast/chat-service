// Handles RabbitMQ connections and messaging

import amqp from 'amqplib';
import { rabbitMQConfig } from '../config/index.js';
import OpenAI from 'openai';
import { ChatMessageParams } from '../interfaces.js';

export async function createConnection() {
  try {
    const connection = await amqp.connect(rabbitMQConfig.connectionString);
    return connection;
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
    throw error;
  }
}

export async function consumeMessages(handleMessage: (openAiToken: string, chatParams: ChatMessageParams) => Promise<boolean>) {
  try {
    const connection = await createConnection();
    const channel = await connection.createChannel();
    channel.consume(rabbitMQConfig.inputQueue, async (msg) => {
      if (msg !== null) {
        const messageContent = JSON.parse(msg.content.toString());
        const responseObj = JSON.parse(messageContent.data);
        const { openAiToken, chatMessageParams }: {openAiToken: string, chatMessageParams: ChatMessageParams} = responseObj;
        
        const success: boolean = await handleMessage(openAiToken, chatMessageParams);
        console.log('Message processed:', success);
        
        if(success) {
          channel.ack(msg);
        }
      }
    });
  } catch (error) {
    console.error('Error consuming messages:', error);
    throw error;
  }
}

export function sendMessageToOutputQueue(chatCompletion: OpenAI.Chat.ChatCompletion) {
  try {
    const response = JSON.stringify( { data: chatCompletion.choices } );
    amqp.connect(rabbitMQConfig.connectionString).then((connection) => {
      connection.createChannel().then((channel) => {
        channel.assertQueue(rabbitMQConfig.outputQueue);
        channel.sendToQueue(rabbitMQConfig.outputQueue, Buffer.from(response));
      });
    });
  } catch (error) {
    console.error('Error sending message to output queue:', error);
    throw error;
  }
}
