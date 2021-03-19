// To be implemented, protected routes baed on the auth feature
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if ( !token ) {
        return res.status(404).json({
            success: false,
            message: "Veuillez vous rassurer que vous etes bien connecte"
        });
    }

    try {
        const decoded = jwt.verify(token, config.get("myprivatekey"));
        req.user = decoded;
        next();
    } catch (ex) {
        //if invalid token
        res.status(400).send("Invalid token.");
    }

};
