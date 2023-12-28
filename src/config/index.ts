// Centralized configuration management

import dotenv from 'dotenv';

dotenv.config();

export const rabbitMQConfig = {
  connectionString: process.env.RABBITMQ_CONNECTION_STRING!,
  inputQueue: process.env.INPUT_QUEUE_NAME!,
  outputQueue: process.env.OUTPUT_QUEUE_NAME!,
};

export const openAIConfig = {
  apiKey: process.env.OPENAI_API_KEY!,
  apiUrl: 'https://api.openai.com/v1/engines/davinci/completions',
};
