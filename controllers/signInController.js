const { User, Doctor } = require('../models');
require('dotenv').config();
const getToken = require('../helpers/jwt');
const bcrypt = require('bcrypt')


class SignInController {
    static async login (req, res, next) {
        try {
            let result = await User.findOne({ where : { email : req.body.email }})

            if (!result) {
                let doctor = await Doctor.findOne({ where : { email : req.body.email }})
                if (!doctor) {
                    res.status(404).json({ message : `User doesn't exists`})

                } else {
                    if (req.body.password === doctor.password) {        
                        let token = getToken({ id: doctor.id,  email: doctor.email})
                        res.status(200).json( {email : doctor.email, token} )
        
                    } else {
                        throw {code : 401, message : "Invalid Account"}
                    }
                }
            } else {
                if (bcrypt.compareSync(req.body.password, result.password)) {        
                    if (result.isVerified === true) {
                        let token = getToken({ id: result.id, email: result.email})
                        res.status(200).json( {email : result.email, token} )
                    } else {
                        throw {
                            code : 404,
                            msg: 'Please verified your email first, check your email'
                        }
                    }             
                } else {
                    throw {code : 401, message : "Invalid Account"}
                }
            }

        } catch (err) {
            if (err.code) {
                next(err)
                
            } else {
                next({
                    code : 500,
                    message : err.message
                })
            }
        }
    }
}

module.exports = SignInController