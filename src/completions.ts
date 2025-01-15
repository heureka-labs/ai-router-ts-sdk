import { APIPromise, RequestOptions } from "openai/core"
import {
  ChatCompletion,
  ChatCompletionChunk,
  ChatCompletionCreateParams,
  ChatCompletionCreateParamsBase,
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionCreateParamsStreaming,
  Completions,
} from "openai/resources/chat/completions"
import { AiRouterModel } from "./types/model"
import { AiRouterWeighting } from "./types/weighting"
import { Stream } from "openai/streaming"

// type AiRouterCompletionCreate = {
//   model: AiRouterModel | "auto"
//   models: AiRouterModel[]
//   weighting: AiRouterWeighting
// } & ChatCompletionCreateParams

export class AiRouterCompletions extends Completions {
  create(
    body: ChatCompletionCreateParamsNonStreaming,
    options?: RequestOptions,
  ): APIPromise<ChatCompletion>
  create(
    body: ChatCompletionCreateParamsStreaming,
    options?: RequestOptions,
  ): APIPromise<Stream<ChatCompletionChunk>>
  create(
    body: ChatCompletionCreateParamsBase,
    options?: RequestOptions,
  ): APIPromise<Stream<ChatCompletionChunk> | ChatCompletion>
  public create(body: ChatCompletionCreateParams, options?: RequestOptions) {
    // const { model, models, weighting, ...originalBody } = body
    return super.create(body, options)
  }
}
