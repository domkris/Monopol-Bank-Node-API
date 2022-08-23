import mongoose from 'mongoose'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import logger from './logger.utils.js'
import { LOG_INFO, LOG_ERRORS } from '../config/config.js'
dotenvExpand.expand(dotenv.config())

async function connectToMongoAtlasDB () {
  const dbConnection = process.env.MONGO_ATLAS_CONN_STRING
  try {
    await mongoose
      .connect(dbConnection)
    logger.info(LOG_INFO.DB_CONNECTED)
  } catch (error) {
    logger.error(LOG_ERRORS.DB_ERROR, error)
    process.exit(1)
  }
}
export default connectToMongoAtlasDB
