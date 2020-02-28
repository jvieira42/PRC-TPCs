var express = require("express");
var router = express.Router();
var axios = require("axios");

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX : <http://prc.di.uminho.pt/2020/amd#>
`;

var getLink = "http://localhost:7200/repositories/amd" + "?query=";

/* GET home page. */
router.get("/", function(req, res, next) {
  var query = `select ?tit (count(?part) as ?numPartituras) ?id where {
    ?id a :Obra .
    ?id :temPartitura ?part .
    ?id :título ?tit
} 
group by ?tit ?id
order by ?tit`;

  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(getLink + encoded)
    .then(obra => {
      var mydata = [];
      mydata = obra.data.results.bindings.map(obra => {
        return {
          id: obra.id.value.split("#")[1],
          tit: obra.tit.value,
          nparts: obra.numPartituras.value
        };
      });
      res.render("index", { obras: mydata });
    })
    .catch(erro => {
      res.render("error", { error: erro });
    });
});

router.get("/obras/:idObra", function(req, res, next) {
  var id = req.params.idObra;
  var queryObra = `select distinct * where { 
    ?id a :Obra.
    filter (?id=:${id})
    ?id :tipo ?type.
    ?id :título ?tit.
    ?id :éCompostaPor ?comp.
    optional {
      ?id :éArranjadaPor ?arr.
    }
}`;

  var queryParts = `select ?p ?voz ?clave ?af ?path where { 
    ?p a :Partitura.
    :${id} :temPartitura ?p .
    ?p :path ?path .
    optional {
    	?p :voz ?voz .    
    }
    optional {
      ?p :clave ?clave .
    }
    optional {
      ?p :afinação ?af .
    }
}`;

  var encoded1 = encodeURIComponent(prefixes + queryObra);
  var encoded2 = encodeURIComponent(prefixes + queryParts);

  axios
    .all([axios.get(getLink + encoded1), axios.get(getLink + encoded2)])
    .then(
      axios.spread((obra, parts) => {
        var mydata1 = [];
        mydata1.id = obra.data.results.bindings[0].id.value.split("#")[1];
        mydata1.type = obra.data.results.bindings[0].type.value;
        mydata1.tit = obra.data.results.bindings[0].tit.value;
        mydata1.comp = obra.data.results.bindings[0].comp.value.split("#")[1];
        mydata1.arr =
          typeof obra.data.results.bindings[0].arr === "undefined"
            ? ""
            : obra.data.results.bindings[0].arr.value.split("#")[1];

        var mydata2 = [];
        mydata2 = parts.data.results.bindings.map(part => {
          var v = typeof part.voz === "undefined" ? "" : part.voz.value;
          var c = typeof part.clave === "undefined" ? "" : part.clave.value;
          var a = typeof part.af === "undefined" ? "" : part.af.value;
          return {
            id: part.p.value.split("#")[1],
            path: part.path.value,
            voz: v,
            clave: c,
            afinacao: a
          };
        });
        res.render("obra", {
          obra: mydata1,
          parts: mydata2
        });
      })
    )
    .catch(error => console.log(error));
});

module.exports = router;
