const socket = io();
const input = document.querySelector('#input');
const form = document.querySelector('#form');
const messageBox = document.querySelector('#message_box')
let username;

do{
    username = prompt('Enter Your Name: ');
}while(!username);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    sendMessage(input.value);
});

// Send Message
const sendMessage = (message) => {
    const userInfo = {name: username, message: message}

    appendMessage(userInfo, 'outgoing');
    input.value = '';

    socket.emit('chat', userInfo);
}

const appendMessage = (userInfo, messageType) => {
    const mainDiv = document.createElement('div');
    const className = messageType;
    mainDiv.classList.add(className);
    const addNameTag = `<p class="name">${userInfo.name}</p>`;
    const addMessageTag = `<p class="message">${userInfo.message}</p>`;
    mainDiv.innerHTML = `${addNameTag} ${addMessageTag}`;
    messageBox.appendChild(mainDiv);
}

// Recieve Message
socket.on('chat', (message) => {
    // console.log(`From Server: ${message}`);
    appendMessage(message, 'incoming');
})