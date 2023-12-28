// Entry point of the application

import { initializeConsumer } from './consumers/messageConsumer';
import { createConnection } from './services/rabbitMQ.service';
import { validateConfig } from './utils/config.validator';

// Validate configuration before starting
validateConfig();

// Initialize RabbitMQ connection and message consumer
createConnection()
  .then(() => {
    initializeConsumer();
  })
  .catch((error) => {
    console.error('Error initializing consumer:', error);
  });
