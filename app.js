if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require('express')
const GetData = require('./controllers/getDataController')
const SignInController = require('./controllers/signInController')
const SignUpController = require('./controllers/signUpController')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)

// SOCKET
const users = []
io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('sendMessage',(data) => {
        console.log(data, ' ke server');

        socket.broadcast.emit('broadcastMessage', data)
    })
    socket.on("loginUser", (user) => {
        users.push(user)
        console.log(users);
    })
})

//PAYMENY
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


app.use(express.urlencoded ({ extended : true }))
app.use(express.json())
app.use(cors())
app.post('/register', SignUpController.register)
app.get('/verify', SignUpController.verify)
app.post('/login', SignInController.login)
app.get('/doctors', GetData.getAll)
app.post('/doctors/payment/:id', GetData.payment)

httpServer.listen(port,function(){
    console.log("Express Started on Port 3000");
});