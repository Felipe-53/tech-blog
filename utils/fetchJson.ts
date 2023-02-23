import assert from "assert"
import { env } from "./env"

interface FetchOptions extends RequestInit {
  queryString?: Record<string, string>
}

const baseUrl = env.articleApiUrl
const token = env.articleApiToken

function makeFetchJson({ techNotes }: { techNotes: boolean }) {
  assert(baseUrl !== "" && token !== "")

  return async function fetchJson<T>(
    endpoint: string,
    { method, queryString, body }: FetchOptions = {
      method: "GET",
      queryString: {},
      body: null,
    }
  ) {
    const url = new URL(baseUrl + endpoint)

    queryString = {
      ...queryString,
      note: techNotes.toString(),
    }

    url.search = new URLSearchParams(queryString).toString()

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: method,
      body,
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

const fetchArticle = makeFetchJson({ techNotes: false })

const fetchTechNote = makeFetchJson({ techNotes: true })

export { makeFetchJson, fetchArticle, fetchTechNote }
