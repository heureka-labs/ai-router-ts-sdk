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

type AiRouterCompletionCreate = {
  model: AiRouterModel | "auto"
  models: AiRouterModel[]
  weighting: AiRouterWeighting
} & ChatCompletionCreateParams

export class AiRouterCompletions extends Completions {
  create(
    body: AiRouterCompletionCreate & ChatCompletionCreateParamsNonStreaming,
    options?: RequestOptions,
  ): APIPromise<ChatCompletion>
  create(
    body: AiRouterCompletionCreate & ChatCompletionCreateParamsStreaming,
    options?: RequestOptions,
  ): APIPromise<Stream<ChatCompletionChunk>>
  create(
    body: AiRouterCompletionCreate & ChatCompletionCreateParamsBase,
    options?: RequestOptions,
  ): APIPromise<Stream<ChatCompletionChunk> | ChatCompletion>
  public create(
    body: AiRouterCompletionCreate & ChatCompletionCreateParams,
    options?: RequestOptions,
  ) {
    return super.create(body, options)
  }
}
