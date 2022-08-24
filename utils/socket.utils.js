import logger from './logger.utils.js'
import { BOT_NAME, LOG_ERRORS } from '../config/config.js'
import { Server } from 'socket.io'
import { formatMessage } from './messages.utils.js'

function setUpSocketIO (server) {
  try {
    const io = new Server(server)
    // io.emit -- to all clients
    // socket.emit -- to current connected client
    // socket.broadcast.emit -- to all clients except current connected client

    // run when client connects
    io.on('connection', (socket) => {
      socket.emit('welcomeMessage', formatMessage(BOT_NAME, 'Welcome!'))
      socket.broadcast.emit('chatMessage', formatMessage(BOT_NAME, 'A user has joined'))
      logger.info('New webSocket connection')

      socket.on('disconnect', () => {
        io.emit('chatMessage', formatMessage(BOT_NAME, 'A user has left'))
        logger.info('webSocket disconnected')
      })

      socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', formatMessage('USER', msg))
        logger.info('message: ' + msg)
      })
    })
  } catch (error) {
    logger.error(LOG_ERRORS.SOCKETIO_ERROR, error)
    process.exit(1)
  }
}
export default setUpSocketIO
