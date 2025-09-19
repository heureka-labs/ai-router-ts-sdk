export enum ModelName {
  O3_MINI = "o3-mini",
  GPT_5 = "gpt-5",
  GPT_5_MINI = "gpt-5-mini",
  GPT_5_NANO = "gpt-5-nano",
  GPT_OSS_120B = "gpt-oss-120b",
  GPT_4O = "gpt-4o",
  GPT_4O_MINI = "gpt-4o-mini",
  GPT_41 = "gpt-4.1",
  GPT_41_MINI = "gpt-4.1-mini",
  GPT_41_NANO = "gpt-4.1-nano",
  MISTRAL_LARGE = "mistral-large",
  MISTRAL_SMALL = "mistral-small",
  CLAUDE_4_OPUS = "claude-4-opus",
  CLAUDE_4_SONNET = "claude-4-sonnet",
  GEMINI_25_PRO = "gemini-2.5-pro",
  GEMINI_25_FLASH = "gemini-2.5-flash",
  GEMINI_2_FLASH = "gemini-2.0-flash",
  GEMINI_2_FLASH_LITE = "gemini-2.0-flash-lite",
  LLAMA_4_MAVERICK = "llama-4-maverick",
  LLAMA_4_SCOUT = "llama-4-scout",
  LLAMA_31_8B = "llama-3.1-8b",
  LLAMA_31_405B = "llama-3.1-405b",
  LLAMA_33_70B = "llama-3.3-70b",
  LLAMA_33_70B_FAST = "llama-3.3-70b-fast",
  QWEN25_72B = "qwen2.5-72B",
  QWEN3_235B_A22B = "qwen-3-235B-A22B",
  QWEN3_30B_A3B = "qwen-3-30B-A3B",
  QWEN3_32B = "qwen-3-32b",
  DEEPSEEK_V3 = "deepseek-v3",
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
