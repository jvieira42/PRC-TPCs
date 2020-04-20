var express = require("express");
var router = express.Router();
var Filmes = require("../controllers/filmes");

/* GET home page. */
router.get("/filmes", function(req, res, next) {
  Filmes.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`));
});

router.get("/filmes/:id/atores", function(req, res, next) {
  Filmes.getAtoresDoFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e =>
      res
        .status(500)
        .send(`Erro na listagem dos atores do filme: ${req.params.id}`)
    );
});

router.get("/filmes/:id/generos", function(req, res, next) {
  Filmes.getGenerosDoFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e =>
      res
        .status(500)
        .send(`Erro na listagem dos generos do filme: ${req.params.id}`)
    );
});

router.get("/filmes/:id/personagens", function(req, res, next) {
  Filmes.getPersonagensDoFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e =>
      res
        .status(500)
        .send(`Erro na listagem dos personagens do filme: ${req.params.id}`)
    );
});

router.get("/filmes/:id", function(req, res, next) {
  Filmes.getFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e =>
      res.status(500).send(`Erro na listagem do filme: ${req.params.id}`)
    );
});

module.exports = router;
