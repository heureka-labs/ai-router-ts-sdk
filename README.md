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

[![npm version](https://badge.fury.io/js/airouter-sdk.svg)](https://www.npmjs.com/package/airouter-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

# Installation

## Basic Installation

Install the package using npm:

```sh
npm install airouter-sdk
```

# Usage

Initialize the AiRouter class with your API key:

```ts
import { AiRouter } from "airouter-sdk"

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

# Development Setup

## Build

```sh
npm run build
```

## Verify exports after building

```sh
npm run check-exports
```

## Run formatting

```sh
npm run format
```

## Run tests (once they exist)

```sh
npm run test
```

## CI

CI is automatically running `npm run ci` which builds, formats and checks build.

## Try package locally

Run the following command in this repo:

```sh
npm link
```

Run the following command in a different local ts/js project to try out the package locally:

```sh
npm link airouter-sdk
```

## Publish

Run the following command and follow the instructions on screen:

```sh
npm publish
```
