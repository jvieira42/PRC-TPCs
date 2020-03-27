var express = require("express");
var router = express.Router();
var Filmes = require("../controllers/filmes");

router.get("/", function(req, res, next) {
  chars = [];
  Filmes.getChars()
    .then(dados => {
      dados.results.bindings.forEach(entry => {
        chars.push({
          nome: entry.name.value
        });
      });
      res.jsonp(chars);
    })
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`));
});

router.get("/:id", async function(req, res, next) {
  char = {};
  try {
    var info = await Filmes.charInfo(req.params.id);
    info.results.bindings.forEach(entry => {
      char.nome = entry.name.value;
    });
    var filmes = await Filmes.charMovies(req.params.id);
    filmes.results.bindings.forEach(entry => {
      char.filmes = entry.movies.value.split(", ");
    });
    var actors = await Filmes.charActors(req.params.id);
    actors.results.bindings.forEach(entry => {
      char.atores = entry.actors.value.split(", ");
    });
    res.jsonp(char);
  } catch (e) {
    res.status(500).send(`Erro na listagem do filme: ${e}`);
  }
});

module.exports = router;
