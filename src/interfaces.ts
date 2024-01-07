import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

export interface ChatMessageParams {
  model: string;
  messages: ChatCompletionMessageParam[];
  temperature: number;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  stream: boolean;
}