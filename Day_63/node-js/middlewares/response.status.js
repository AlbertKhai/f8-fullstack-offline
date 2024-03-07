module.exports = (req, res, next) => {
   res.success = (status, message, data, options = {}) => {
      const response = { status, message, data, ...options };
      return res.status(status).json(response);
   };

   res.err = (status, message, errors) => {
      const response = { status, message, errors };
      return res.status(status).json(response);
   };

   next();
};
