var express = require("express");
var router = express.Router();
var axios = require("axios");

/* GET home page. */
router.get("/", function(req, res, next) {
  axios
    .get("http://localhost:7200/repositories")
    .then(repos => {
      res.render("index", {
        repos: repos.data.results.bindings
      });
    })
    .catch(error => console.log(error));
});

router.get("/result", function(req, res, next) {
  var query = req.query.query;
  var parts = query.split("?query=");
  var path = parts[0] + "?query=";
  var encoded = encodeURIComponent(parts[1]);

  axios
    .get(path + encoded)
    .then(function(dados) {
      res.jsonp(dados.data);
    })
    .catch(erro => res.jsonp(erro));
});

module.exports = router;
