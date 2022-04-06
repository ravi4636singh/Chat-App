const express = require('express')
const app = express()
const http = require('http')
const path = require('path')

const server = http.createServer(app)
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})

app.use(express.static(path.join(__dirname + '/public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname) + '/views/login.html')
})

app.post('/', (req, res) => {
    res.sendFile(path.join(__dirname) + '/views/index.html')
})

// Socket connection
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    socket.on('chat', (message) => {
        socket.broadcast.emit('chat', message)
    })
})