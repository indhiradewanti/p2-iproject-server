require('dotenv').config()
const express = require('express')
const GetData = require('./controllers/getDataController')
const SignInController = require('./controllers/signInController')
const SignUpController = require('./controllers/signUpController')
const app = express()
const port = 3000
const cors = require('cors')


app.use(express.urlencoded ({ extended : true }))
app.use(express.json())
app.use(cors())
app.post('/register', SignUpController.register)
app.get('/verify', SignUpController.verify)
app.post('/login', SignInController.login)
app.get('/doctors', GetData.getAll)
app.post('/doctors/payment/:id', GetData.payment)

app.listen(port,function(){
    console.log("Express Started on Port 3000");
});