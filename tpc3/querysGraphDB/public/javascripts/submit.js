const prefixes = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX xml: <http://www.w3.org/XML/1998/namespace> 
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    `;

const getLink = "http://localhost:7200/repositories/";

$(document).ready(function() {
  $("#submit").click(function() {
    var rep = $("#repository").val();
    var query = $("#query").val();

    var prefRepo =
      "PREFIX : <http://www.semanticweb.org/joao/ontologies/2020/1/" +
      rep +
      "#>";

    var prefs = prefixes + prefRepo;

    var encoded = encodeURIComponent(prefs + query);
    var link = getLink + rep + "?query=" + encoded;

    axios
      .get("http://localhost:3090/result?query=" + link)
      .then(function(dados) {
        var result = JSON.stringify(dados.data.results.bindings);
        $("#result").val(result);
      })
      .catch(function(error) {
        $("#result").val(error);
      });
  });
});
