const catchAsync = (func) => {
    return (req, res, next) => {
      func(req, res, next).catch((error) => next(error));
    };
  };
  
  const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    err.status = err.status || 500;
  
    res.status(err.status).json({ message: err.message });
  };
  
  module.exports = { catchAsync, globalErrorHandler };
  