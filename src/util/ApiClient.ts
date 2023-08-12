import Client from 'api-railway'

const client = new Client({ BASE_URL: 'localhost:5000/api', PROTOCOL: 'http' })

export default client
