var express = require("express");
var router = express.Router();
var Filmes = require("../controllers/filmes");

router.get("/", function(req, res, next) {
  atores = [];
  Filmes.getAtores()
    .then(dados => {
      dados.results.bindings.forEach(entry => {
        atores.push({
          nome: entry.name.value,
          sexo: entry.sex.value
        });
      });
      res.jsonp(atores);
    })
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`));
});

router.get("/:id", async function(req, res, next) {
  ator = {};
  try {
    var info = await Filmes.actorInfo(req.params.id);
    info.results.bindings.forEach(entry => {
      (ator.nome = entry.name.value), (ator.sexo = entry.sex.value);
    });
    var filmes = await Filmes.actorMovies(req.params.id);
    filmes.results.bindings.forEach(entry => {
      ator.filmes = entry.movies.value.split(", ");
    });
    var persona = await Filmes.actorChars(req.params.id);
    persona.results.bindings.forEach(entry => {
      ator.personagens = entry.chars.value.split(", ");
    });
    res.jsonp(ator);
  } catch (e) {
    res.status(500).send(`Erro na listagem do filme: ${e}`);
  }
});

module.exports = router;
