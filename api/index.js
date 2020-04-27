module.exports = (req, res) => {
  res.send({
    pid: process.pid,
    query: req.query
  });
};
