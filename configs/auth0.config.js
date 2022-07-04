const env = require('./env.config')

module.exports = {
    authRequired: false,
    auth0Logout: true,
    secret: env.auth0.SECRET,
    baseURL: env.auth0.BASEURL,
    clientID: env.auth0.CLIENTID,
    issuerBaseURL: env.auth0.ISSUERBASEURL
};