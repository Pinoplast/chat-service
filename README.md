# RabbitMQ ChatGPT Integration

This project demonstrates an integration between RabbitMQ, a message broker, and OpenAI's ChatGPT API, allowing communication with an AI-powered chatbot through a message queue.

## Overview

This Node.js application acts as an intermediary service between RabbitMQ and the OpenAI ChatGPT API. It listens for incoming messages from a RabbitMQ queue, sends those messages to the ChatGPT API for processing, and returns the AI-generated response back to another queue.

## Prerequisites

Ensure you have the following prerequisites installed:

- Node.js
- RabbitMQ server running locally or remotely

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pinoplast/chat-service.git
   ```

2. Install the dependencies:
   ```bash
   npm i
   ```

3. Build the chat service:
   ```bash
   npm run build
   ```

## RabbitMQ Configuration

To use this integration, you need to configure RabbitMQ and set up the necessary queues.

1. Install RabbitMQ server if you haven't already. You can download it from the official RabbitMQ website.

2. Start the RabbitMQ server.

3. Create two queues: one for incoming messages and one for outgoing responses. You can use the RabbitMQ management console or the command line tools to create the queues.

   - Incoming messages queue: `INPUT_QUEUE_NAME`
   - Outgoing responses queue: `OUTPUT_QUEUE_NAME`

## Usage

To use the RabbitMQ ChatGPT integration, follow these steps:

1. Start the RabbitMQ server if it's not already running.

2. Start the chat service:
   ```bash
   npm run start
   ```

3. Send a message to the `INPUT_QUEUE_NAME` queue. The application will process the message using the ChatGPT API and send the AI-generated response to the `OUTPUT_QUEUE_NAME` queue.

The application expects messages in the input queue to be JSON objects with the following structure:

```json
{
  "openAiToken": "<Your OpenAI API Token>",
  "chatMessageParams": {
    "model": "<Model Name (e.g., 'text-davinci-002')>",
    "messages": [
      {
        "role": "<Role (e.g., 'system', 'user', or 'assistant')>",
        "content": "<Message Content>"
      },
      // More messages as needed
    ],
    "temperature": <Temperature (e.g., 0.5)>,
    "max_tokens": <Max Tokens (e.g., 100)>,
    "top_p": <Top P (e.g., 1.0)>,
    "frequency_penalty": <Frequency Penalty (e.g., 0.0)>,
    "presence_penalty": <Presence Penalty (e.g., 0.0)>,
    "stream": <Stream (e.g., false)>
  }
}

4. Retrieve the response from the `OUTPUT_QUEUE_NAME` queue and handle it as needed.

The `Choice` object has the following structure:

```json

{
   data: {
      "finish_reason": "<Finish Reason (e.g., 'stop', 'length', 'tool_calls', 'content_filter', 'function_call')>",
      "index": <Index (e.g., 0)>,
      "logprobs": {
         "content": [
            // Array of ChatCompletionsAPI.ChatCompletionTokenLogprob objects or null
         ]
      },
      "message": {
         // ChatCompletionsAPI.ChatCompletionMessage object
      }
   }
}
## Troubleshooting

If you encounter any issues with the RabbitMQ ChatGPT integration, try the following troubleshooting steps:

- Make sure the RabbitMQ server is running and accessible.
- Check the application logs for any error messages.
- Verify that the queues are set up correctly and have the correct permissions.
- Ensure that the ChatGPT API credentials are correctly configured in the application.

If the issue persists, please refer to the project's documentation or seek help from the community.
