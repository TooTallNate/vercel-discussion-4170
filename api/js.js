export default (req, res) => {
  res.send({
    hi: 'bonjour',
    pid: process.pid
  });
};
