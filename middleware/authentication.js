// middleware/authentication.js
// middleware/authentication.js
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: (req, res, next) => {
        const token = req.header('Authorization');

        if (!token) {
            const error = new Error('No token provided.');
            error.statusCode = 401;
            return next(error);
        }

        jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
            if (err) {
                const error = new Error('Failed to authenticate token.');
                error.statusCode = 401;
                return next(error);
            }

            req.user = decoded;
            next();
        });
    }
}


