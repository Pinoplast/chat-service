# RabbitMQ ChatGPT Integration

This project demonstrates an integration between RabbitMQ, a message broker, and OpenAI's ChatGPT API, allowing communication with an AI-powered chatbot through a message queue.

## Overview

This Node.js application acts as an intermediary service between RabbitMQ and the OpenAI ChatGPT API. It listens for incoming messages from a RabbitMQ queue, sends those messages to the ChatGPT API for processing, and returns the AI-generated response back to another queue.

## Prerequisites

Ensure you have the following prerequisites installed:

- Node.js
- RabbitMQ server running locally or remotely
- OpenAI API key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pinoplast/rabbitmq-chatgpt.git
