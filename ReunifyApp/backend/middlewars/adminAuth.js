const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const adminAuth = (req, res, next) => {
  try {
    const Token = req.header("Auth-Token");

    if (!Token) {
      return res.status(401).json({ message: "Access denied." });
    }
    jwt.verify(Token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err)
        return res.status(400).json({ msg: "invalide Token !!" });
      const decodeToken = jwt_decode(Token);
      if (decodeToken.role !== "admin")
        return res.status(400).json({ msg: "you are not admin!!" });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.msg });
  }
};

module.exports = adminAuth;
