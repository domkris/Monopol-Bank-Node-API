import express from 'express'
import cors from 'cors'
import { PORT, LOG_ERRORS } from './config/config.js'
import { roleRouter } from './routes/role.route.js'
import { userRouter } from './routes/user.route.js'
import connectToMongoAtlasDB from './utils/dbConnection.utils.js'
import logger from './utils/logger.utils.js'
import setUpSocketIO from './utils/socket.utils.js'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// set static folder
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'public')))

// middlewares
app.use(cors())

// routes:
app.use('/roles', roleRouter)
app.use('/users', userRouter)

// app.get('/chat', (req, res) => {
//   res.sendFile('public/index.html', { root: '.' })
// })

app.use('/', (req, res, next) => {
  const error = new Error(LOG_ERRORS.NOT_FOUND)
  logger.error(error)
  next()
})

server.listen(port, () => {
  logger.info(`Server running on port: ${port}`)
  connectToMongoAtlasDB()
  setUpSocketIO(server)
})
