const express = require('express')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/test')
})

app.get('/:room', (req, res) => {
    res.render('room', {roomId: req.params.room})
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) =>{
        console.log(roomId, userId)
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
        socket.on('disconnect', () =>{
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})
server.listen(3000)
console.log('server started')
