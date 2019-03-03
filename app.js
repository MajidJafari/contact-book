const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config/databse");
mongoose.connect(config.database, {useNewUrlParser: true});

const indexRouter = require("./routes/index");
const contactBookRouter = require("./routes/contactBook");

const app = express();

app.use(logger("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cookieParser())
    .use(sassMiddleware({
        src: path.join(__dirname, "public"),
        dest: path.join(__dirname, "public"),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true
    }))
    .use(express.static(path.join(__dirname, "public")))
    .use(cors())
    .use("/", indexRouter)
    .use("/contact-book", contactBookRouter);

module.exports = app;
