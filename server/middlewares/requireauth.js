const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
//Middleware for checking user authorization for protected routes

const isLoggedin = (req, res, next) => {
    try {
        const { token } = req.headers;
        const user = jwt.verify(token, "shhhhh")
        if (!user) {
            return res.status(401).json({
                message: "Please Login First"
            })
        }
        else {
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