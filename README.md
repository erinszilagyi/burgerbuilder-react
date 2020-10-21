# Burger Builder

React app to build burgers with a fixed set of ingredients. This app uses axios for HTTP Requests, react-router for routing, redux for state management, and Firebase as the backend.

S3 hosted example: http://vegan-burger-builder-react.s3-website.ca-central-1.amazonaws.com

Firebase hosted example:

## Setup

### Node Modules

    $ npm install

### Firebase

#### Database

1.  Setup a new project on firebase
2.  Go to the Realtime Database page
3.  Click on 'Create Database' button. This will create a MongoDB-like database.
4.  Take note of the database endpoint, it will be something like: https://[your-project-name].firebaseio.com/
5.  Set the rules to:

        {
            "rules": {
                "ingredients": {
                    ".read": true,
                    ".write": true,
                },
                "orders": {
                    ".read": "auth != null",
                    ".write": "auth != null",
                    ".indexOn": ["userId"]
                }
            }
        }

#### Authentication

1. Go the Authentication page
2. Go to the Sign-in method tab
3. Enable the Email/Password provider

Firebase endpoint for sign up with email/password:

    https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

Firebase endpoint for sign in with email password:

    https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

Firebase endpoint to get user's data:

    https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]

NOTE: You can get your API Key by going to Settings -> General -> Web API Key

For complete docs, check out: https://firebase.google.com/docs/reference/rest/auth#section-api-usage

### Environment Variables

Create a .env file in the main project folder with the following variables:

    REACT_APP_FIREBASE_DB_ENDPOINT=https://[your-project-name].firebaseio.com/
    REACT_APP_FIREBASE_API_KEY=yourapikey

## Run

    $ npm start

## Test

    $ npm run test

## Deploy to Firebase
