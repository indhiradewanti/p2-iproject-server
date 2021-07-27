require('dotenv').config()
const express = require('express')
const SignInController = require('./controllers/signInController')
const SignUpController = require('./controllers/signUpController')
const app = express()
const port = 3000


app.use(express.urlencoded ({ extended : true }))
app.use(express.json())
app.post('/register', SignUpController.register)
app.get('/verify', SignUpController.verify)
app.post('/login', SignInController.login)

app.listen(port,function(){
    console.log("Express Started on Port 3000");
});