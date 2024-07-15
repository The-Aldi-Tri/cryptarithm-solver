const errorHandler = (err, req, res) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
};

module.exports = errorHandler;
