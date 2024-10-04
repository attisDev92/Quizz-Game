import app from './app.js'
import http from 'http'
import { PORT } from './utils/environment.js'

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`server runningon port ${PORT}`)
})
