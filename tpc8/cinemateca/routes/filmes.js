var express = require("express");
var router = express.Router();
var Filmes = require("../controllers/filmes");

/* GET home page. */
router.get("/", function(req, res, next) {
  filmes = [];
  Filmes.getLista()
    .then(dados => {
      dados.results.bindings.forEach(entry => {
        filmes.push({
          titulo: entry.titulo.value,
          duracao: entry.duracao.value,
          dataLancamento: entry.data.value,
          lingua: entry.lingua.value,
          paisOrigem: entry.pais.value,
          realizador: entry.rnome.value
        });
      });
      res.jsonp(filmes);
    })
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`));
});

router.get("/:id", async function(req, res, next) {
  filme = {};
  try {
    var info = await Filmes.movieInfo(req.params.id);
    info.results.bindings.forEach(entry => {
      (filme.titulo = entry.titulo.value),
        (filme.duracao = entry.duracao.value),
        (filme.dataLancamento = entry.data.value),
        (filme.lingua = entry.lingua.value),
        (filme.paisOrigem = entry.pais.value),
        (filme.realizador = entry.realizador.value);
    });
    var produtores = await Filmes.movieProducers(req.params.id);
    produtores.results.bindings.forEach(entry => {
      filme.produtores = entry.producers.value.split(", ");
    });
    var atores = await Filmes.movieActors(req.params.id);
    atores.results.bindings.forEach(entry => {
      filme.atores = entry.actors.value.split(", ");
    });
    var generos = await Filmes.movieGenres(req.params.id);
    generos.results.bindings.forEach(entry => {
      filme.generos = entry.genres.value.split(", ");
    });
    var chars = await Filmes.movieChars(req.params.id);
    chars.results.bindings.forEach(entry => {
      filme.personagens = entry.chars.value.split(", ");
    });
    res.jsonp(filme);
  } catch (e) {
    res.status(500).send(`Erro na listagem do filme: ${e}`);
  }
});

module.exports = router;
