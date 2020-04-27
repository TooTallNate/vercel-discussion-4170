module.exports = (req, res) => {
  res.send({
    url: req.url,
    query: req.query
  });
};
