# dowhile-app-node

## Project setup

#### Install dependencies
```
yarn install
```
### Create a file called `.env` in the root of project with theese variables:

**GITHUB_CLIENT_ID** -> Github OAuth Client ID
**GITHUB_CLIENT_SECRET** -> GitHub OAuth Secret


**JWT_SECRET** -> Secret used for jwt token

**API_KEY**, **AUTH_DOMAIN**, **PROJECT_ID**, **STORAGE_BUCKET**,
**MESSAGING_SENDER_ID**, **APP_ID** -> Variables used to setup connection with the database

> Refer to [NLWHeatDoWhileAppVue](https://github.com/xSallus/nlw-heat-dowhile-app) repo for intruction on how to setup and run the frontend app to consume API in this project,
> Or consume this API with REST Client of your choice :D

### Compiles and hot-reloads for development
```
yarn dev
```

## The endpoints available in this API:

_'/messages'_ (GET) -> Returns info of the author of a message, must pass author_id as query parameter *author* in the request

_'/messages/last_3'_ (GET only) -> Returns the last three messages

_'/messages'_ (POST) -> Create a new message entry into the database and return's the new message

_'/authenticate'_ (POST only) -> Perform user creation, if doesn't exists, and returns info about user Android a jwt token for authenticated requests

_'/profile'_ (GET only) -> Returns the data related to a given,*logged in*, user

>> Enjoy :D

![dowhile](https://github.com/xSallus/nlw-heat-dowhile-app/blob/front/src/assets/default-icons/dowhile.svg)
