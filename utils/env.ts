import assert from "assert"

const env = {
  articleApiUrl: process.env.ARTICLE_API_URL as string,
  articleApiToken: process.env.ARTICLE_API_TOKEN as string,
  techNoteApiUrl: process.env.TECH_NOTE_API_URL as string,
  techNoteApiToken: process.env.TECH_NOTE_API_TOKEN as string,
  recipientApiUrl: process.env.RECIPIENT_API_URL as string,
  recipientApiToken: process.env.RECIPIENT_API_TOKEN as string,
} as const

for (const key of Object.keys(env)) {
  // @ts-ignore
  assert(typeof env[key] === "string" && env[key] !== "")
}

export { env }
