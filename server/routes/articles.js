const express = require("express");
var app = express();

// app.get('/article', BlogController.getBySlug)
// app.get('/articles', BlogController.get)
// app.get('/articles/recent', BlogController.getRecent)


app.get("/", function(req, res) {
  res.send({
    hello: "get all articles"
  });
});

app.get("/article", function(req, res) {
  res.send({
    hello: "get one by id"
  });
});

app.get("/recent", function(req, res) {
  res.send({
    hello: "get recent"
  });
});

module.exports = app;
