import { rabbitMQConfig, openAIConfig } from '../config';

export function validateConfig(): void {
  const requiredEnvVariables = [
    'RABBITMQ_CONNECTION_STRING',
    'INPUT_QUEUE_NAME',
    'OUTPUT_QUEUE_NAME',
    'OPENAI_API_KEY',
  ];

  const missingVariables = requiredEnvVariables.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingVariables.join(', ')}`
    );
  }

  // Optionally, you can perform additional validations, such as checking URL formats, API key lengths, etc.

  // Validate RabbitMQ configuration
  if (!rabbitMQConfig.connectionString) {
    throw new Error('RabbitMQ connection string is missing or invalid');
  }

  if (!rabbitMQConfig.inputQueue || !rabbitMQConfig.outputQueue) {
    throw new Error('RabbitMQ input or output queue names are missing or invalid');
  }

  // Validate OpenAI configuration
  if (!openAIConfig.apiKey) {
    throw new Error('OpenAI API key is missing or invalid');
  }
}
