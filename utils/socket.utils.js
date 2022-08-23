import logger from './logger.utils.js'
import { LOG_ERRORS } from '../config/config.js'
import { Server } from 'socket.io'

function setUpSocketIO (server) {
  try {
    const io = new Server(server)
    io.on('connection', (socket) => {
      socket.broadcast.emit('hi')
      console.log('a user connected')

      socket.on('disconnect', () => {
        console.log('user disconnected')
      })

      socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
        console.log('message: ' + msg)
      })
    })
  } catch (error) {
    logger.error(LOG_ERRORS.SOCKETIO_ERROR, error)
    process.exit(1)
  }
}
export default setUpSocketIO
