// Centralized configuration management

import dotenv from 'dotenv';

dotenv.config();

export const rabbitMQConfig = {
  connectionString: process.env.RABBITMQ_CONNECTION_STRING!,
  inputQueue: process.env.INPUT_QUEUE_NAME!,
  outputQueue: process.env.OUTPUT_QUEUE_NAME!,
};
