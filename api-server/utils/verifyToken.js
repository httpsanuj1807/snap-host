const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  
  const token = req?.cookies?.access_token;

  if (!token) {
    return res.status(200).json({message: "Unauthorized request."});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(200).json({message: "Unauthorized request."});
    }

    req.access_token = decoded.access_token;
    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;
