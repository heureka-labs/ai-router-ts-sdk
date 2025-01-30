import { AiRouterModel } from "./types/model"
import type { AiRouterEmbeddingType } from "./types/embeddingModel"

const AI_ROUTER_API_KEY_ENV_VAR_NAME = "AIROUTER_API_KEY"
const AI_ROUTER_BASE_URL_ENV_VAR_NAME = "AIROUTER_HOST"
const AI_ROUTER_BASE_URL = "https://api.airouter.io"

type Message = { role: string; content: string }

export type GetBestModelParams = (
  | {
      messages: Message[]
      fullPrivacy?: boolean
      embedding?: never
      embeddingType?: never
    }
  | {
      messages?: never
      fullPrivacy?: boolean
      embedding: number[]
      embeddingType: AiRouterEmbeddingType
    }
) & {
  [key: string]: any // Allow additional parameters
}

export class AiRouter {
  private apiKey: string
  private baseUrl: string
  constructor(apiKey?: string, baseUrl?: string) {
    // set the airouter api key
    if (!apiKey) {
      apiKey = process.env[AI_ROUTER_API_KEY_ENV_VAR_NAME]
      if (!apiKey) {
        throw new Error(
          `${AI_ROUTER_API_KEY_ENV_VAR_NAME} must be set either by passing apiKey to the constructor or by setting the ${AI_ROUTER_API_KEY_ENV_VAR_NAME} environment variable`,
        )
      }
    }
    this.apiKey = apiKey

    // adjust the base url to the airouter
    this.baseUrl =
      baseUrl ??
      process.env[AI_ROUTER_BASE_URL_ENV_VAR_NAME] ??
      AI_ROUTER_BASE_URL
  }

  public async getBestModel({
    messages,
    fullPrivacy = false,
    embedding,
    embeddingType,
    ...additionalParams
  }: GetBestModelParams): Promise<AiRouterModel> {
    // explicitly set full privacy if an embedding is provided
    if (embedding) {
      fullPrivacy = true
    }

    // in full privacy mode, send embeddings instead of messages
    if (fullPrivacy) {
      if (!embedding) {
        throw new Error(
          `Automatically generating embeddings for the full privacy mode is not supported yet. Please provide an embedding.`,
        )
      }
      return await this.getBestModelByEmbedding(
        embedding,
        embeddingType,
        additionalParams,
      )
    }

    // in model selection mode, send messages to the airouter to receive the best model
    return await this.getBestModelByMessages(messages, additionalParams)
  }

  private async getBestModelByMessages(
    messages: Message[],
    additionalParams: Record<string, any> = {},
  ): Promise<AiRouterModel> {
    return await this.executeRequest({ messages, ...additionalParams })
  }

  private async getBestModelByEmbedding(
    embedding: number[],
    embeddingType: AiRouterEmbeddingType,
    additionalParams: Record<string, any> = {},
  ): Promise<AiRouterModel> {
    return await this.executeRequest({
      embedding,
      embeddingType,
      ...additionalParams,
    })
  }

  private async executeRequest({
    messages,
    embedding,
    embeddingType,
    fullPrivacy,
    ...additionalParams
  }: GetBestModelParams): Promise<AiRouterModel> {
    const body = messages
      ? { messages, ...additionalParams }
      : { embedding, embedding_type: embeddingType, ...additionalParams }
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
      const errorData = await response.json()
      console.error(errorData)
      throw new Error("Failed to run AI Router request")
    }

    const responseJson = await response.json()
    const bestModel = AiRouterModel.fromString(
      responseJson.choices[0].message.content,
    )

    return bestModel
  }
}
