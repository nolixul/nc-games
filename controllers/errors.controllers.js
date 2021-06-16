exports.handle500Errors = (err, req, res, next) => {
  console.log(err, '<--- ERROR');
  res.status(500).send({ msg: 'Internal server error!' });
};
