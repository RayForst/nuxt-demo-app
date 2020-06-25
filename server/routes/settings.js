const SettingsController = require("./../controllers/Settings");
const express = require("express");

var app = express();
app.get("/", SettingsController.get);

module.exports = app;
