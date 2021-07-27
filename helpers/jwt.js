const jwt = require('jsonwebtoken');

function getToken (data) {
    return jwt.sign(data, process.env.SECRET_KEY, { expiresIn : 60 * 60 })
}

module.exports = getToken