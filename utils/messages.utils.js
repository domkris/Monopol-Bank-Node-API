import dayjs from 'dayjs'

export const formatMessage = function (username, text) {
  return {
    username,
    text,
    time: dayjs().format('D.M.YYYY HH:mm:ss')
  }
}
