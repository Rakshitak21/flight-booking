const jwt = require("jsonwebtoken");

const generateAccessToken = (userdata) => {
  return jwt.sign(userdata, process.env.TOKEN_SECRET);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  console.log("Auth Header`");
  if (authHeader == null || authHeader == undefined) return res.sendStatus(403);

  const token_prefix = authHeader.split(" ")[0];
  const token = authHeader && authHeader.split(" ")[1];

  if (token_prefix !== process.env.TOKEN_PREFIX) return res.sendStatus(403);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

module.exports = {
  generateAccessToken,
  authenticateToken,
};
