import 'dotenv/config'
import express from 'express'
import { Server } from 'socket.io'
import http from 'https'
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

io.on("connection", socket => {
  console.log("Connected")
})

app.use(express.json())
app.use(router)

export { serverHTTP, io }
