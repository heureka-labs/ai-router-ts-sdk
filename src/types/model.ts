export enum ModelName {
  GPT_5_2 = "gpt-5.2",
  GPT_5_1 = "gpt-5.1",
  GPT_5 = "gpt-5",
  GPT_5_MINI = "gpt-5-mini",
  GPT_5_NANO = "gpt-5-nano",
  GPT_OSS_120B = "gpt-oss-120b",
  MISTRAL_LARGE = "mistral-large",
  MISTRAL_SMALL = "mistral-small",
  CLAUDE_4_1_OPUS = "claude-4-1-opus",
  CLAUDE_4_5_SONNET = "claude-4-5-sonnet",
  CLAUDE_4_5_HAIKU = "claude-4-5-haiku",
  GEMINI_35_FLASH_LITE = "gemini-3.5-flash-lite",
  GEMINI_31_FLASH_LITE = "gemini-3.1-flash-lite",
  GEMINI_36_FLASH = "gemini-3.6-flash",
  GEMINI_35_FLASH = "gemini-3.5-flash",
  GEMINI_31_PRO_PREVIEW = "gemini-3.1-pro-preview",
  GEMINI_25_PRO = "gemini-2.5-pro",
  LLAMA_33_70B = "llama-3.3-70b",
  LLAMA_33_70B_FAST = "llama-3.3-70b-fast",
  QWEN3_235B_A22B = "qwen-3-235B-A22B",
  QWEN3_30B_A3B = "qwen-3-30B-A3B",
  PHI_4 = "phi-4",
  UNKNOWN = "unknown",
}

export class AiRouterModel {
  private originalValue?: string

  private constructor(
    private model: ModelName,
    originalValue?: string,
  ) {
    this.originalValue = originalValue
  }

  static fromString(value: string): AiRouterModel {
    const enumValues = Object.values(ModelName)
    const model = enumValues.includes(value as ModelName)
      ? (value as ModelName)
      : ModelName.UNKNOWN

    return new AiRouterModel(
      model,
      model === ModelName.UNKNOWN ? value : undefined,
    )
  }

  toString(): string {
    return this.originalValue ?? this.model
  }

  getModel(): ModelName {
    return this.model
  }

  equals(other: AiRouterModel | ModelName): boolean {
    if (other instanceof AiRouterModel) {
      return this.model === other.model
    }
    return this.model === other
  }
}
