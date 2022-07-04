require("dotenv").config({path:'./.env'});

module.exports = {
    server: {
        PORT: 3000,
        NODE_ENVIR: "development", // enum: ["development", "production", "local"]
        domain: "http://localhost:3000"
    },
    database:{
        DBURI:process.env.DBURI
    },
    auth0: {
      SECRET: process.env.SECRET,
      BASEURL: process.env.BASEURL,
      CLIENTID: process.env.CLIENTID,
      ISSUERBASEURL: process.env.ISSUERBASEURL
    },
    jwt:{
      SECTER_ACCESS_TOKEN: process.env.JWT_SECTER_ACCESS_TOKEN,
      SECTER_REFRESH_TOKEN: process.env.JWT_SECTER_REFRESH_TOKEN
    },
    mail:{
      ID: process.env.MAILID,
      PASS: process.env.MAILPASS,
    }
};