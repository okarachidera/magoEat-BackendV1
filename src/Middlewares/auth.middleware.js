// // To be implemented, protected routes baed on the auth feature
// const jwt = require("jsonwebtoken");
// const config = require("config");

// module.exports = (req, res, next) => {
//     const token = req.headers["x-access-token"] || req.headers["authorization"];

//     if ( !token ) {
//         return res.status(404).json({
//             success: false,
//             message: "Veuillez vous rassurer que vous etes bien connecte"
//         });
//     }

//     try {
//         const decoded = jwt.verify(token, config.get("myprivatekey"));
//         req.user = decoded;
//         next();
//     } catch (ex) {
//         //if invalid token
//         res.status(400).send("Invalid token.");
//     }

// };


// this code will be usefull for dashboad protected routes
const jwt = require('jsonwebtoken');
const codeStatus = require('../constants/status-codes')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(codeStatus.BAD_REQUEST).json({
      error: new Error('Invalid request!')
    });
  }
};
