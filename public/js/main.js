
const chatForm = document.getElementById('chat-form')
const chatMessagesDiv = document.querySelector('.chat-messages')
// eslint-disable-next-line no-undef
const socket = io()

socket.on('welcomeMessage', message => {
  console.log(message)
  outputMessage(message)
})

socket.on('chatMessage', message => {
  console.log(message)
  outputMessage(message)

  // Scroll down
  chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight
})

// message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const msg = e.target.elements.msg.value
  console.log(msg)

  socket.emit('chatMessage', msg)

  // Clear input
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

// display message to DOM
function outputMessage (message) {
  console.log(message)
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="meta">${message.username}<span> ${message.time}</span></p><p class="text">${message.text}</p>`
  document.querySelector('.chat-messages').appendChild(div)
}
