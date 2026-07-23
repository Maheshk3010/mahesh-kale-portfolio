import { conversationService } from "./conversationService";
import type { ChatEngine, ChatEngineResponse, ChatMessage } from "./types";

/**
 * LocalChatEngine — deterministic, offline engine backed by the JSON
 * knowledge base and the ConversationService. Conforms to the ChatEngine
 * interface so it can be swapped for an OpenAI/gateway-backed engine later
 * without touching the UI.
 */
export class LocalChatEngine implements ChatEngine {
  async ask(question: string, history: ChatMessage[] = []): Promise<ChatEngineResponse> {
    return conversationService.respond(question, history);
  }
}

export const mahiEngine: ChatEngine = new LocalChatEngine();

export type { ChatEngine, ChatEngineResponse, ChatMessage } from "./types";
