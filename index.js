import express from 'express'
import { PORT } from './config/config.js'
import connectToMongoAtlasDB from './utils/dbConnection.utils.js'
import logger from './utils/logger.utils.js'

const app = express()
app.listen(PORT, () => {
  logger.info(`Server running on port: ${PORT}`)
  connectToMongoAtlasDB()
})
