<div align="center">

<a href="https://airouter.io" target="_blank">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://airouter.io/assets/images/logo-w.png" style="max-width: 100%; width: 200px; margin-bottom: 20px">
        <img alt="AI Router Logo" src="https://airouter.io/assets/images/logo.png" width="200px">
    </picture>
</a>

#

🪄 **AI Router**: Automatically get the best LLM for any request.

<h4>

[Documentation](https://airouter.io/docs) | [Pricing](https://airouter.io/pricing) | [FAQ](https://airouter.io/faq)

</h4>

[![npm version](https://badge.fury.io/js/@airouter.io%2Fairouter-sdk.svg)](https://www.npmjs.com/package/airouter-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

# Installation

## Basic Installation

Install the package using npm:

```sh
npm install @airouter.io/airouter-sdk
```

# Usage

Initialize the AiRouter class with your API key:

```ts
import { AiRouter } from "@airouter.io/airouter-sdk"

const airouter = new AiRouter(
    '<YOUR-API-KEY>',
)
const bestModel = await airouter.getBestModel({
    messages: [{ role: "user", content: "Hey how are you doing?" }],
})

const bestModelFullPrivacy = await airouter.getBestModel({
    embedding: ['<EMBEDDING>'],
    embeddingModel: "text-embedding-3-small",
})
```

# License
This project is licensed under the MIT License - see the LICENSE file for details.
