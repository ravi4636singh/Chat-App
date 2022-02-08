const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});

app.use(express.static(path.join(__dirname + '/client')));

app.get('/', (req, res) => {
    res.status(200).sendFile('/index.html');
});

io.on('connection', (socket) => {
    // console.log('connected...');
    socket.on('chat', (message) => {
        // console.log(`From Client: ${message}`);
        socket.broadcast.emit('chat', message);
    })
});