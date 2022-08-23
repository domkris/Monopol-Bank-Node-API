import pino from 'pino'
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'UTC:dd-mm-yyyy HH:MM:ss.l o',
      ignore: 'pid,hostname'
    }
  }
})

export default logger
