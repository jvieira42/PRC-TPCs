var Filmes = module.exports;
const axios = require("axios");

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`;

var getLink = "http://localhost:7200/repositories/cinema" + "?query=";

Filmes.getLista = async function() {
  var query = `select ?titulo ?duracao ?data ?lingua ?pais ?realizador ?rnome 
  where {
      ?f a c:Filme.
      ?f c:título ?titulo.
      ?f c:duração ?duracao.
      ?f c:dataLançamento ?data.
      ?f c:temLíngua ?l.
      bind(replace(strafter(str(?l), 'cinema#'),"_"," ") AS ?lingua).
      filter(?lingua = 'English')
      ?f c:temPaísOrigem ?p.
      bind(replace(strafter(str(?p), 'cinema#'),"_"," ") AS ?pais).
      ?f c:temRealizador ?realizador.
      ?realizador c:nome ?rnome.
  }`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.movieInfo = async function(id) {
  var query = `select ?titulo ?duracao ?data ?lingua ?pais ?realizador 
  where {
      c:${id} rdf:type c:Filme.
      c:${id} c:título ?titulo.
      c:${id} c:duração ?duracao.
      c:${id} c:dataLançamento ?data.
      c:${id} c:temLíngua ?l.
      bind(replace(strafter(str(?l), 'cinema#'),"_"," ") AS ?lingua).
      filter(?lingua = 'English')
      c:${id} c:temPaísOrigem ?p.
      bind(replace(strafter(str(?p), 'cinema#'),"_"," ") AS ?pais).
      c:${id} c:temRealizador ?rnome.
      ?rnome c:nome ?realizador.
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.movieProducers = async function(id) {
  var query = `select (group_concat(?pnome; separator=", ") as ?producers)
  where {
      c:${id} rdf:type c:Filme.
      c:${id} c:foiProduzido ?prod.
      bind(replace(strafter(str(?prod), 'cinema#'),"_"," ") AS ?pnome).
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.movieActors = async function(id) {
  var query = `select (group_concat(?anome; separator=", ") as ?actors)
  where {
      c:${id} rdf:type c:Filme.
      c:${id} c:temAtor ?ator.
      bind(replace(strafter(str(?ator), 'cinema#'),"_"," ") AS ?anome).
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.movieGenres = async function(id) {
  var query = `select (group_concat(?gnome; separator=", ") as ?genres)
  where {
      c:${id} rdf:type c:Filme.
      c:${id} c:temGénero ?gen.
      bind(replace(strafter(str(?gen), 'cinema#'),"_"," ") AS ?gnome).
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.movieChars = async function(id) {
  var query = `select (group_concat(?cnome; separator=", ") as ?chars)
  where {
      c:${id} rdf:type c:Filme.
      c:${id} c:temPersonagem ?c.
      bind(replace(strafter(str(?c), 'cinema#'),"_"," ") AS ?cnome).
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.getAtores = async function() {
  var query = `select ?name ?sex
  where {
      ?a rdf:type c:Ator.
      ?a c:nome ?name.
      ?a c:sexo ?sex.
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.actorInfo = async function(id) {
  var query = `select ?name ?sex
  where {
      ?n rdf:type c:Ator.
      ?n c:nome "${id}".
      bind(replace(strafter(str(?n), 'cinema#'),"_"," ") AS ?name).
      ?n c:sexo ?sex.
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.actorMovies = async function(id) {
  var query = `select (group_concat(?film; separator=", ") as ?movies)
  where {
      ?a rdf:type c:Ator.
      ?a c:nome "${id}".
      ?a c:atuou ?f.
      bind(replace(strafter(str(?f), 'cinema#'),"_"," ") AS ?film).
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.actorChars = async function(id) {
  var query = `select (group_concat(?char; separator=", ") as ?chars)
  where {
      ?a rdf:type c:Ator.
      ?a c:nome "${id}".
      ?a c:representa ?c.
      bind(replace(strafter(str(?c), 'cinema#'),"_"," ") AS ?char).
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.getChars = async function() {
  var query = `select ?name
  where {
      ?a rdf:type c:Personagem.
      ?a c:nome ?name.
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.charInfo = async function(id) {
  var query = `select ?name
  where {
      ?a rdf:type c:Personagem.
      ?a c:nome "${id}".
      bind(replace(strafter(str(?a), 'cinema#'),"_"," ") AS ?name).
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.charMovies = async function(id) {
  var query = `select (group_concat(?film; separator=", ") as ?movies)
  where {
      ?a rdf:type c:Personagem.
      ?a c:nome "${id}".
      ?a c:éPersonagemDe ?f.
      bind(replace(strafter(str(?f), 'cinema#'),"_"," ") AS ?film).
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};

Filmes.charActors = async function(id) {
  var query = `select (group_concat(?actor; separator=", ") as ?actors)
  where {
      ?c rdf:type c:Personagem.
      ?c c:nome "${id}".
      ?c c:éRepresentadoPor ?a.
      bind(replace(strafter(str(?a), 'cinema#'),"_"," ") AS ?actor).
}`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.get(getLink + encoded);
    return response.data;
  } catch (e) {
    throw e;
  }
};
