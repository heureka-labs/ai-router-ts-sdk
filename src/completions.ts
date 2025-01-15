import { RequestOptions } from "openai/core"
import {
  ChatCompletionCreateParams,
  Completions,
} from "openai/resources/chat/completions"
import { AiRouterModel } from "./types/model"
import { AiRouterWeighting } from "./types/weighting"

// type AiRouterCompletionCreate = {
//   model: AiRouterModel | "auto"
//   models: AiRouterModel[]
//   weighting: AiRouterWeighting
// } & ChatCompletionCreateParams

export class AiRouterCompletions extends Completions {
  public create(body: ChatCompletionCreateParams, options?: RequestOptions) {
    // const { model, models, weighting, ...originalBody } = body
    return super.create(body, options)
  }
}
