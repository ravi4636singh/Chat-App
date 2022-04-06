const form = document.querySelector('#form')
const message = document.querySelector('#message')
const messageBox = document.querySelector('#message_box')

const username = localStorage.getItem('username')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    sendMessage(message.value)
})

const socket = io()

// Send Message
const sendMessage = (msg) => {
    const outgoingMsg = {
        name: username,
        message: msg
    }
    
    socket.emit('chat', outgoingMsg)

    outgoingAppend(outgoingMsg, 'outgoing')
    message.value = ''
}

const outgoingAppend = (msg, msgType) => {
    const div = document.createElement('div')
    const cssClass = msgType
    div.classList.add(cssClass)
    const appendMsg = `<span class="message-out">${msg.message}</span>`
    div.innerHTML = appendMsg
    messageBox.appendChild(div)
}

// Receive Message
socket.on('chat', (message) => {
    incomingAppend(message, 'incoming');
})

const incomingAppend = (msg, msgType) => {
    const div = document.createElement('div')
    const cssClass = msgType
    div.classList.add(cssClass)
    const appendName = `<span class="receiver-name">${msg.name}</span>`
    const appendMsg = `<span class="message-in">${msg.message}</span>`
    div.innerHTML = `${appendName} ${appendMsg}`
    messageBox.appendChild(div)
}