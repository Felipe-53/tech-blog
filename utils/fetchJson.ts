interface FetchOptions {
  method: 'GET' | 'POST',
  queryString: object,

}

async function fetchJson<T>(endpoint: string, { method, queryString}: FetchOptions = {
  method: 'GET', queryString: {}
}) {
  const baseUrl = process.env.API_URL
  if (!baseUrl) throw new Error('env API_URL not defined')

  const url = new URL(baseUrl + endpoint)

  if (Object.keys(queryString).length !== 0) {
    // @ts-ignore
    url.search = new URLSearchParams(queryString).toString()
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN}`
    },
    method: method,
    
  })

  if (!response.ok) {
    const responseData = {
      url: response.url,
      status: response.status,
      payload: await response.json()
    }
    throw Error(`Not ok response: \n ${JSON.stringify(responseData)}`)
  }

  const payload: T = await response.json()
  return payload
}

export default fetchJson
