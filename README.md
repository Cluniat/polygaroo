<div align="center">
<img src="uploads/0fc85af16f316c3eccea7986d0251948/polygaroo.png" width="200" height="200">
<h2>POLYGAROO project</h2>
</div>

## Table of contents
* [About the project](#about-the-project)
    * [Built with](#built-with)
* [Getting started](#getting-started)
    * [Installations](#installations)
    * [Running with Docker](#running-with-docker)
    * [Running without Docker](#running-without-docker)
    * [Running mobile application](#running-mobile-application)
     
## About the project
### Built with
* [Express](https://expressjs.com)
* [VueJS](https://github.com/vuejs/vue)
* [ReactNative]()

## Getting started

### Installations

* Enter your SSH public key into Gitlab project
* Clone the repo
```sh
git clone git@forge.univ-lyon1.fr:polygaroo-team/polygaroo.git
cd polygaroo
cp .env.example .env
```
* React native dependencies
You can find it [here](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-3) 
It's recommanded to install it without expo.

### Running with Docker

#### Prerequisites
You need the following tools to start this project : 
* docker(engine > 18 and compose > 1.23)
* ngrok

Add your host file : 
* Open `C:/Windows/System32/drivers/etc/hosts` in an admin bloc note
* Insert 
```sh
127.0.0.1   api.polygaroo.localhost
127.0.0.1   polygaroo.localhost
```

### Ngrok (dev only)

```
# from ngrok folder
ngrok http api.polygaroo.localhost:80
# copy domain name in .env file (for example 1a2b3c4d.ngrok.io)
# copy in App/Config/index.js for API_URL
```

#### Start API and backOffice
```sh 
docker-compose up -d
```
* API is running by default [here](http://api.polygaroo.localhost/api)
* BackOffice is running by default [here](http://polygaroo.localhost)

#### Create Super Admin User with docker
Double-clic sur `polygaroo/dockerCreateSuperAdmin.sh` pour exécuter la création du super admin. 

Ce dernier exécute sur mongo dans le conteneur polygarou_mongo_1, le script `polygaroo/api/createSuperAdmin.js` 

(copié précédement dans le conteneur) qui fait l'insertion de l'user suivant :

* email : super@admin.fr 
* password : superPolygaroo
* name : superAdmin
* is_admin : true


### Running without Docker
#### Prerequisites
* Node 11.12
* MongoDB shell 4.2.1
* yarn 1.16.0 
* run following scripts :
```sh 
cd api
yarn
cd ../bo
yarn
```
* Go to `api/index.js` and modify
```javascript
mongoose.connect('mongodb://mongo:27017/restpolygaroo', {
    useNewUrlParser: true
} )
```
to 
```javascript
mongoose.connect('mongodb://localhost:27017/restpolygaroo', {
    useNewUrlParser: true
} )
```

##### Start API and backOffice
In a terminal : 
```sh 
cd api
yarn nodemon index.js
```
Api is running [here](http://localhost:3000/api)

In another terminal : 
```sh 
cd bo/polygaroobo
yarn run serve
```
BackOffice is running [here](http://localhost:8080)

#### Running mobile application
Yo can setup the projet by running : 
- `yarn install` to install the dependencies
- create your [configuration file `App/Config/index.js`](App/Config) from `index.dev.js` (if you are in dev environment) and fill the missing values
- run the following steps for your platform

##### Android

- only the first time you run the project, you need to generate a debug key with:
  - `cd android/app`
  - `keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000`
  - `cd ../..` to come back to the root folder
- `react-native run-android` to run the Android application (remember to start a simulator or connect an Android phone) 
