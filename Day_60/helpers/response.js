module.exports = {
   successResponse: (res, status, message, data) => {
      const response = { status, message, data };
      return res.status(status).json(response);
   },
   errorResponse: (res, status, message, errors = {}) => {
      const response = { status, message, errors };
      res.status(status).json(response);
   },
};
