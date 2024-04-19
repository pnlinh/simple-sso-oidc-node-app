const oidc = {
    issuer: process.env.OIDC_TOKEN_ISSUER,
    authorizationURL: process.env.OIDC_AUTHORIZE_URL,
    tokenURL: process.env.OIDC_ACCESS_TOKEN_URL,
    userInfoURL: process.env.OIDC_RESOURCE_OWNER_DETAILS_URL,
    clientID: process.env.OIDC_CLIENT_ID,
    clientSecret: process.env.OIDC_CLIENT_SECRET,
    callbackURL: process.env.OIDC_CALLBACK_URL,
    scope: process.env.OIDC_SCOPES.split(','),
    state: true,
    redirectUrlAfterLogout: process.env.OIDC_REDIRECT_URL_AFTER_LOGOUT,
    redirectPathAfterLogin: process.env.OIDC_REDIRECT_PATH_AFTER_LOGIN,
    failureRedirect: process.env.OIDC_REDIRECT_PATH_FAILURE,
}

module.exports = oidc;
