const jwt = require('jsonwebtoken');
const sendEmail = require('../helpers/nodemailer');
const { User } = require('../models');
require('dotenv').config();

class SignUpController {
    static async register(req, res, next) {
        try {
            let newUser = {
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                password : req.body.password,
                phoneNumber : req.body.phoneNumber,
            }
            let createUser = await User.create(newUser)
            const token =  jwt.sign({
                id : createUser.id,
                email : createUser.email
            }, process.env.SECRET_KEY)
            sendEmail(req.body.email, token)
            res.status(200).json({ id : createUser.id, email : createUser.email, token })

        } catch (err) {
            console.log(err);
            if (err.name === `SequelizeValidationError`) {
                let errMessage = err.errors.map(err => {
                    return err.message
                })
                next({
                    code : 400,
                    message : errMessage
                })
            } else {
                next({
                    code : 500,
                    message : err.message
                })
            }
        }
    }

    static async verify(req, res, next) {
        try {
            if ((req.protocol+"://"+req.headers.host) === 'http://localhost:3000') {

                const payload = jwt.verify(req.query.token, process.env.SECRET_KEY)

                const isUser = await User.findByPk(payload.id)
                    if (isUser) {
                        console.log("email is verified");
                        const updateTrue = {
                            isVerified : true
                        }
                        const updateisVerified = await User.update(updateTrue, { where : { id : isUser.id}})
                        res.status(200).json(updateisVerified)
                    } else {
                        throw {
                            code : 404,
                            msg : 'Not Found'
                        }
                    }
            }
        } catch (err) {
            console.log(err);
            next({
                code : 500,
                message : err.message
            })
        }
    }
}

module.exports = SignUpController