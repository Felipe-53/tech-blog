import assert from "assert"

const env = {
  articleApiUrl: process.env.ARTICLE_API_URL as string,
  articleApiToken: process.env.ARTICLE_API_TOKEN as string,
} as const

for (const key of Object.keys(env)) {
  assert(
    // @ts-ignore
    typeof env[key] === "string" && env[key] !== "",
    `Missing environment variable ${key}`
  )
}

export { env }
