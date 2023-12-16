const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
//Middleware for checking user authorization for protected routes

const isLoggedin = (req, res, next) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({
                message: "Please Login First"
            })
        }
        else {
            req.body.user = decoded.user
            next()
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error!!"
        })
    }
}

module.exports = isLoggedin