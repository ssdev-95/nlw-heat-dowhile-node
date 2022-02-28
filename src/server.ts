import 'dotenv/config'
import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'

import { router } from './routes'

const app = express()
app.use(cors())

const serverHTTP = http.createServer(app)
const io = new Server(serverHTTP, {
  cors: {
		origin: '*'
	}
})

io.on('connection', socket => {
	console.log(`A new client has connected at: ${socket.id}`)
})

app.use(express.json())
app.use(router)

export { serverHTTP, io, app }
