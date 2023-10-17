// middleware/errorHandling.js

module.exports = {
    errorHandler: (err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';

        console.error(err.stack); // log the error stack trace for debugging

        res.status(statusCode).json({
            message: message
        });
    }
}
