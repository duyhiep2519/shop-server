const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.SECRET_SIGN);
    req.user = verified;
    res.send(req.user);
  } catch (err) {
    res.status(400);
  }
};

module.exports = verifyUser;
