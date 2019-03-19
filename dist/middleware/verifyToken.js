"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Verify Token
var verifyToken = function verifyToken(req, res, next) {
  // Get auth header value
  var bearerHeader = req.headers.authorization; //  Check if bearer is undefined

  if (typeof bearerHeader !== 'undefined') {
    //  Split at the space
    var bearer = bearerHeader.split(' '); // Get token from array

    var bearerToken = bearer[1]; // Set the token

    req.token = bearerToken; // Next middleware

    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

var _default = verifyToken;
exports.default = _default;