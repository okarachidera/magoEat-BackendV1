const jwt = require("jsonwebtoken");
const codeStatus = require("../constants/status-code");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      res.status(codeStatus.FORBIDDEN).json({
        success: false,
        message: "Vos identifiants ne sont pas correctes, veuillez vous connecter",
        error: new Error("Invalid user ID")
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(codeStatus.BAD_REQUEST).json({
      success: false,
      message: "Votre session semble invalide, veuillez vous connecter",
      error: new Error("Invalid request!")
    });
  }
};
