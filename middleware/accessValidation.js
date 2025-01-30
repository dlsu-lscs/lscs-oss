const accessValidation = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

  jwt.verify(token, process.env.CLIENT_SECRET_KEY, (err, user) => {
    req.user = user;
    next();
  })
  return res.status(400).send({ status: "error", message: "Invalid user." });
}

module.exports = accessValidation;
