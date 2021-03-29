const jwt = require("jsonwebtoken");
const codeStatus = require("../constants/status-code");

module.exports = (req, res, next) => {
    // console.log(req.headers.authorization.split(" ")[1]);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        // console.log(decodedToken);
        const userId = decodedToken.userId;
        if (req.body.username && req.body.username !== userId) {
            res.status(codeStatus.FORBIDDEN).json({
                success: false,
                error: new Error("Invalid user ID")
            });
        } else {
            next();
        }
    } catch (err) {
        res.status(codeStatus.BAD_REQUEST).json({
            // success: false,
            error: new Error("Invalid request!")
        });
    }
};
