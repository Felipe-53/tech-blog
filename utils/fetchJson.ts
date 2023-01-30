import assert from "assert"
import { env } from "./env"

interface FetchOptions {
  method: "GET" | "POST" | "PATCH"
  queryString?: object
}

function makeFetchJson(baseUrl: string, token: string) {
  assert(baseUrl !== "" && token !== "")

  return async function fetchJson<T>(
    endpoint: string,
    { method, queryString }: FetchOptions = {
      method: "GET",
      queryString: {},
    }
  ) {
    const url = new URL(baseUrl + endpoint)

    if (queryString && Object.keys(queryString).length !== 0) {
      // @ts-ignore
      url.search = new URLSearchParams(queryString).toString()
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: method,
    })

    if (!response.ok) {
      const responseData = {
        url: response.url,
        status: response.status,
        payload: await response.json(),
      }
      throw Error(`Not ok response: \n ${JSON.stringify(responseData)}`)
    }

    const payload: T = await response.json()
    return payload
  }
}

const fetchFromArticleApi = makeFetchJson(
  env.articleApiUrl,
  env.articleApiToken
)

const fetchFromTechNoteApi = makeFetchJson(
  env.techNoteApiUrl,
  env.techNoteApiToken
)

export { makeFetchJson, fetchFromArticleApi, fetchFromTechNoteApi }
