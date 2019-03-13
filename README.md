[![Build Status](https://travis-ci.org/vincentayorinde/epic-mail.svg?branch=develop)](https://travis-ci.org/vincentayorinde/epic-mail)  [![Maintainability](https://api.codeclimate.com/v1/badges/24369de22068a482c55d/maintainability)](https://codeclimate.com/github/vincentayorinde/epic-mail/maintainability)


# Epic Mail
Epic Mail is a web application that help people exchange messages or information over the internet

## Getting Started
### Perequiste
1. Internet connection
2. Internet browser
3. Node JS
4. Git

### Template Pages URL

- https://vincentayorinde.github.io/epic-mail/index.html

### API URL

- https://epic-mail-host.herokuapp.com/ 

### API Documentation

- https://epic-mail-host.herokuapp.com/api-docs


### User Access
**Admin user**

email: admin@epicmail.com
password: Password234 (note that the password is case sensitive)

### How to get a local copy
**Clone repository**
- Copy repository link
- Create a folder location in your computer eg /path/folder
- cd /path/folder/
- git clone repositorylink.git
- cd epic-mail
- npm install
- npm run start
- open index.html file
- Login with any dummy email id and passowrd

### Routes
- POST https://epic-mail-host.herokuapp.com/api/v1/auth/signup Create a user account
- POST https://epic-mail-host.herokuapp.com/api/v1/auth/signin Login a user 
- POST https://epic-mail-host.herokuapp.com/api/v1/messages Create or send email
- GET https://epic-mail-host.herokuapp.com/api/v1/messages Get all emails
- GET https://epic-mail-host.herokuapp.com/api/v1/messages/unread/userId Get all unread user emails
- GET https://epic-mail-host.herokuapp.com/api/v1/messages/send/userId Get all sent user emails
- GET https://epic-mail-host.herokuapp.com/api/v1/messages/messageId Get a specific email record
- DELETE https://epic-mail-host.herokuapp.com/api/v1/messages/messageId Delete a specific email record



### Branches 
The branches created in this application are structured such that they correspond to feature developed in the application. For example, the  name with a ft-login-xxx corresponds codes for the login page and ft-signup-xxx corresponds to codes for the signup page, other branches will be add as project is still ongoing.
 The develop branch is positioned currently as the default branch due to the on-going nature of this project. It is expected that as the project nears completion some branches will be merged and completely deleted.

### Testing
Test locally by executing "npm run test"

  ```
   POST /messages
    √ Should create or send an email on /api/v1/messages POST (277ms)

  GET /messages
    √ Should get all receive mails on /api/v1/messages GET

  GET /messages/unread/:id
    √ Should get all unread mails by user on /api/v1/messages/unread/:id GET

  GET /messages/sent/:id
    √ Should get all mails sent by user on /api/v1/messages/sent/:id GET

  GET /messages/:id
    √ Should get a mail record on /api/v1/messages/:id GET

  DELETE /messages/:id
    √ Should delete a mail record on /api/v1/messages/:id DELETE

  POST /auth/signup
    √ Should Create a new user on /api/v1/auth/signup POST (333ms)

  POST /auth/signup Validations
    √ Should require confirmation of password to match the  user password
    √ Firstname must be between 2 and 30 characters
    √ Lastname must be between 2 and 30 characters
    √ Lastname must be between 2 and 30 characters ********
    √ Lastname must be between only alphabets

  POST /auth/signin
    √ Should sign in a user on /api/v1/auth/signin POST (222ms)
    √ User must provide a valid email address


  14 passing (1s) 
  ```

## Built with
- HTML/CSS
- Javascript
- Node JS

## Contributors

- Vincent Olagbemide (vincentayorinde)

## Author

- Vincent Olagbemide (vincentayorinde)