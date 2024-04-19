# OpenID Connect with Node.Js

Simple Node.Js application with OpenID Connect to working with Authentik

### How to use

```shell
docker network create sso

cp .env.example .env

make all (or make build run)
```

### OpenID Connect Configuration

```dotenv
OIDC_CLIENT_ID=client_id
OIDC_CLIENT_SECRET=secret
OIDC_SCOPES=openid,email,profile
OIDC_CERT_FILE=oidc_cert.pem
OIDC_TOKEN_ISSUER=https://auth-server.com/application/o/name/
OIDC_AUTHORIZE_URL=https://auth-server.com/application/o/authorize/
OIDC_ACCESS_TOKEN_URL=https://auth-server.com/application/o/token/
OIDC_RESOURCE_OWNER_DETAILS_URL=http://auth-server.com/application/o/userinfo/
OIDC_REDIRECT_PATH_AFTER_LOGIN="/dashboard"
OIDC_REDIRECT_PATH_FAILURE="/login"
OIDC_REDIRECT_URL_AFTER_LOGOUT=https://auth-server.com/application/o/name/end-session/
OIDC_CALLBACK_URL=https://domain2.com/oidc/callback
```

### Useful commands

```shell
make help
⚡ build                          Build docker image
⚡ destroy                        Alias docker-compose down command
⚡ logs                           Show service container logs
⚡ ps                             View services status
⚡ redis-cli                      Connect redis cli
⚡ restart                        Restart service containers
⚡ root                           Enter bash in running Docker container as root user
⚡ run                            Run application in Docker. Run 'make build' first
⚡ shell                          Enter bash in running Docker container
⚡ stop                           Force stop service containers
```
