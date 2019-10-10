const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/todo', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = require("./users.js");
app.use("/api/users", users.routes);

const item = require("./item.js");
app.use("/api/item", item.routes);

const preferences = require("./preferences.js");
app.use("/api/preferences", preferences.routes);

app.listen(3001, () => console.log('Server listening on port 3001!'));