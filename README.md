# Bootcamp GoStack - FastFeet
Desafio FastFeet do Bootcamp GoStack 🚀👨🏻‍🚀

FastFeet é aplicação de uma transportadora fictícia.

[1] Run this command to install all dependencies on package.json

~$`yarn install`


______________________________________________________________________________
  
- **[express](https://expressjs.com/)** **: is a minimal and flexible Node.js web application framework**
  - | general purposes, it has almost all the tools for the backend |
  
- **[yup](https://yarnpkg.com/package/yup)** **: is a simple schema validation API**  
  - | to reinforce the `allowNull: false` field in migrations |
  
- **[sequelize](https://sequelize.org/)** **: is a ORM (Object-Relational Mapper) to {PostgreSQL, MariaDB, MySQL, SQLite e MSSQL}**
  - | i use this ORM because supports multiple databases / with a Postgres docker running |
  
- **[pg pg-hstore](https://sequelize.org/master/manual/getting-started.html)** **: driver for your database, i'm using Postgres see more drivers on link**
  - | no comments |
  
- **[bcryptjs](https://sentry.io/welcome/)** **: is a cryptography API to generate password hash and authentications**
  - | to encode and decode hash's on application |
  
- **[youch](https://yarnpkg.com/package/youch)** **: is a pretty error report for Node.js**
  - | youch return a JSON error, it's cool for async functions debug |
  
- **[nodemailer](https://nodemailer.com/about/)** **: is a module for Node.js to send emails**
  - | i use the [Mailtrap](https://mailtrap.io/) to development app |
  
- **[express-handlebars nodemailer-express-handlebars](https://handlebarsjs.com)** **: plugins for nodemailer view engine to generate emails**
  - | create a  HTML template and pass variables to sending e-mails |
  
- **[@sentry/node](https://sentry.io)** **: error management tool for production applications**
  - | i didn't use this tool so much |
  
- **[bee-queue](https://github.com/bee-queue/bee-queue)** **: a simple, fast, robust job/task queue for Node.js, backed by Redis.**
  - | was used to create e-mail queues in background and reduce the time of requests / running a Redis(alpine) docker |
  
- **[date-fns](https://date-fns.org/)** **: is a javaScript date utility library
  - | is simple and useful for handling dates |
  
- **[dotenv](https://github.com/motdotla/dotenv)** **: module that loads environment variables from a .env file into => `process.env`**
  - | great for code modularization and reuse |
  
- **[express-async-errors](https://yarnpkg.com/package/express-async-error)** **: is a extension to capture async errors on express**
  - | no comments |
  
- **[jsonwebtoken](https://yarnpkg.com/package/jsonwebtoken)** **: API to generate a JWT to authenticate applications**
  - | to create JWT auth, and use this on middleware to ADM routes |
  
- **[multer]()** **: is a node.js middleware for handling `multipart/form-data` serving files**
  - | upload files to aplication and set avatar images, and use as a signature-photo |
  
_____________________________________________________________________________________________________________________________
