const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const userRoutes = require('./server/routes/api/user')
const itemRoutes = require('./server/routes/api/item')
const authRoutes = require('./server/routes/api/auth')
const mongoose = require('mongoose')
const server = require('http').createServer(app)
const config = require('config')

let io = require('socket.io')(server)

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/item', itemRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => res.send('Server up'))

io.on('connection', (socket) => {
  console.log('A user has conneted')

  socket.on('SEND_MESSAGE', (msg) => {
    console.log('msg ', msg)

    io.emit('RECEIVE_MESSAGE', msg)
  })
})

const db = config.get('mongoURI')

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err))

server.listen(port, () => console.log(`listening on port ${port}!`))
