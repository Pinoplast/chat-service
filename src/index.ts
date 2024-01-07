import { initializeConsumer } from './consumers/messageConsumer.js';
import { createConnection } from './services/rabbitMQ.service.js';
import { validateConfig } from './utils/config.validator.js';

console.log('Starting chat service...');

// Validate configuration before starting
validateConfig();

// Initialize RabbitMQ connection and message consumer
createConnection()
  .then(() => {
    initializeConsumer();
    console.log('RabbitMQ connection established');
  })
  .catch((error) => {
    console.error('Error initializing consumer:', error);
  });
