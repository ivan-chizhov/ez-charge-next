export const isJsonResponse = (response) => {
  const contentType = response.headers.get('Content-Type')
  return contentType && contentType.includes('application/json')
}

export const getJsonMessage = (json) => {
  if (json && json.message) {
    return json.message
  }
}

export const fetchJson = async (url, data = undefined, method = undefined) => {
  method = method || (data ? 'POST' : 'GET')

  const options = {
    method,
    headers: {},
  }

  if (data) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, options)
  const responseJson = isJsonResponse(response) ? await response.json() : null

  return [response, responseJson]
}
