const { expressjwt: jwt } = require('express-jwt');
require("dotenv").config();

function getTokenFromHeaders(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }

  return null;


}

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET || 123456,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders,
});

module.exports = {
  isAuthenticated,
};
