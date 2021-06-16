exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'bad request' });
  }
};

exports.handle500Errors = (err, req, res, next) => {
  console.log(err.code, '<--- ERROR');
  res.status(500).send({ msg: 'Internal server error!' });
};

exports.send404 = (req, res, next) => {
  res.status(404).send({ msg: 'not found' });
};
