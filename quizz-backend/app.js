import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { requestLogger, unknownEndpoint } from './middlewares/infoRequest.js'

import playerEndpoint from './routes/players.js'

import './config/DBConfig.js'

const app = express()

app.use(morgan(':method :url :status :response-time ms'))
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/players', playerEndpoint)

app.use(unknownEndpoint)

export default app
