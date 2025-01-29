import type { AiRouterModel } from "./types/model"
import type { AiRouterEmbeddingModel } from "./types/embeddingModel"

type Message = { role: string; content: string }

export type GetBestModelParams =
  | {
      messages: Message[]
      embedding?: never
      embeddingModel?: never
    }
  | {
      messages?: never
      embedding: number[]
      embeddingModel: AiRouterEmbeddingModel
    }

export class AiRouter {
  private apiKey: string
  private baseUrl: string
  constructor(apiKey?: string, baseUrl: string = "https://api.airouter.io") {
    if (!apiKey) {
      apiKey = process.env.AI_ROUTER_API_KEY
      if (!apiKey) {
        throw new Error("AI_ROUTER_API_KEY is required")
      }
    }
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  public async getBestModel({
    messages,
    embedding,
    embeddingModel,
  }: GetBestModelParams): Promise<AiRouterModel> {
    if (messages) {
      return await this.getBestModelByMessages(messages)
    } else {
      return await this.getBestModelByEmbedding(embedding, embeddingModel)
    }
  }

  private async getBestModelByMessages(
    messages: Message[],
  ): Promise<AiRouterModel> {
    return await this.executeRequest({ messages })
  }

  private async getBestModelByEmbedding(
    embedding: number[],
    embeddingModel: AiRouterEmbeddingModel,
  ): Promise<AiRouterModel> {
    return await this.executeRequest({ embedding, embeddingModel })
  }

  private async executeRequest({
    messages,
    embedding,
    embeddingModel,
  }: GetBestModelParams): Promise<AiRouterModel> {
    const body = messages
      ? { messages }
      : { embedding, embedding_type: embeddingModel }
    const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "auto",
        model_routing: false,
        ...body,
      }),
    })

    if (!response.ok) {
      console.error(response.json())
      throw new Error("Failed to run ai router request")
    }

    return await response.json()
  }
}
