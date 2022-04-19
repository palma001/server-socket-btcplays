const express = require('express')
const SocketIO = require('socket.io')
const cors = require('cors')
const app = express()

// settings
app.use(cors)
app.set('port', process.env.PORT || 3000)

const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
})

// Socket IO
const io = SocketIO(server, {
    cors: {
        origin: '*',
        credentials: true
    }
})

// Websockets
io.on('connection', function (socket) {
    socket.on('new-angle', function (data) {
        io.emit('angle', data)
    })

    socket.on('new-result', function (data) {
        io.emit('result', data)
    })

    socket.on('new-time', function (data) {
        console.log(data)
        io.emit('time', data)
    })
})