import Client from 'api-railway'

// const client = new Client({ BASE_URL: 'railway-api.ddns.net/api' })
const client = new Client({ BASE_URL: process.env.API_URL, PROTOCOL: 'http' })

export default client
