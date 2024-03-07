module.exports = {
   serviceError: (status, message, errors) => ({
      error: [status, message, errors],
   }),
};
