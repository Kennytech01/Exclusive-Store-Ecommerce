const errorMiddleware = (err, req, res, next) => {
    // console.log('Here is an error middlewire')
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error!'
    return res.status(statusCode).json(
        {
            success: false,
            message,
            statusCode
        })
}

export default errorMiddleware