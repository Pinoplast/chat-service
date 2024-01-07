import { rabbitMQConfig } from '../config/index.js';

export function validateConfig(): void {
  const requiredEnvVariables = [
    'RABBITMQ_CONNECTION_STRING',
    'INPUT_QUEUE_NAME',
    'OUTPUT_QUEUE_NAME',
  ];

  const missingVariables = requiredEnvVariables.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingVariables.join(', ')}`
    );
  }

  // Validate RabbitMQ configuration
  if (!rabbitMQConfig.connectionString) {
    throw new Error('RabbitMQ connection string is missing or invalid');
  }

  if (!rabbitMQConfig.inputQueue || !rabbitMQConfig.outputQueue) {
    throw new Error('RabbitMQ input or output queue names are missing or invalid');
  }
}
