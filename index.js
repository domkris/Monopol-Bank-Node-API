import express from 'express'
import cors from 'cors'
import { PORT, LOG_ERRORS } from './config/config.js'
import { roleRouter } from './routes/role.route.js'
import { userRouter } from './routes/user.route.js'
import connectToMongoAtlasDB from './utils/dbConnection.utils.js'
import logger from './utils/logger.utils.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// middlewares
app.use(cors())

// routes:
app.use('/roles', roleRouter)
app.use('/users', userRouter)

app.get('/chat_test', (req, res) => {
  res.sendFile('chat_test.html', { root: '.' })
})

app.use('/', (req, res, next) => {
  const error = new Error(LOG_ERRORS.NOT_FOUND)
  logger.error(error)
  res.send(404).json(error)
  next()
})

app.listen(PORT, () => {
  logger.info(`Server running on port: ${PORT}`)
  connectToMongoAtlasDB()
})
