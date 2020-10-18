# Burger Builder

React app to build burgers with a fixed set of ingredients. This app uses axios for HTTP Requests, react-router for routing, and Firebase as the backend.

S3 hosted example: http://vegan-burger-builder-react.s3-website.ca-central-1.amazonaws.com

Firebase hosted example:

## Setup

### Node Modules

    $ npm install

### Firebase

1.  Setup a new project on firebase
2.  Go to the Realtime Database and click on 'Create Database' button. This will create a MongoDB-like database.
3.  Take note of the database endpoint, it will be something like: https://[your-project-name].firebaseio.com/
4.  Set the rules to:

        {
            "rules": {
                ".read": true,
                ".write": true,
            }
        }

### Environment Variables

Create a .env file in the main project folder with the following variables:

REACT_APP_FIREBASE_DB_ENDPOINT=https://[your-project-name].firebaseio.com/

## Run

    $ npm start

## Deploy to Firebase
