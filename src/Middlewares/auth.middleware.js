const jwt = require("jsonwebtoken");
const codeStatus = require("../constants/status-codes");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
        } else {
            next();
        }
    } catch (err) {
        res.status(codeStatus.BAD_REQUEST).json({
            error: new Error("Invalid request!")
        });
    }
};
