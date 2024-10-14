require('dotenv').config()
const express = require("express");
const session = require("express-session");
const passport = require('./configs/passport.config');
const path = require("path");
const router = require('./routes/app.router');
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log(`Members Only - listening on port ${port}!`));