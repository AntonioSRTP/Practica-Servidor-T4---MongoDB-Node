var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";
var express = require("express");
var llamar = express();

llamar.listen(8083, '127.0.0.3', function() {
    console.log('Servidor ejecutándose en http://127.0.0.3:8083');
});   

llamar.use("/1", function(peticion, respuesta) {
  let titulo = "Personajes Humanos";
  let sentencia = {species: "human"};
  busqueda(peticion, respuesta, titulo, sentencia);
})

llamar.use("/2", function(peticion, respuesta) {
  let titulo = "Nacimiento antes de 1979";
  let sentencia = {yearOfBirth: {$lt: 1979}};
  busqueda(peticion, respuesta, titulo, sentencia);
})

llamar.use("/3", function(peticion, respuesta) {
  let titulo = "Atributo Holly";
  let sentencia = {"wand.wood": "holly"};
  busqueda(peticion, respuesta, titulo, sentencia);
})

llamar.use("/4", function(peticion, respuesta) {
  let titulo = "Personajes vivos";
  let sentencia = {alive: true, hogwartsStudent: true};
  busqueda(peticion, respuesta, titulo, sentencia);
})

function busqueda(peticion, respuesta, titulo, sentencia) {
  MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
    if (err) throw eer;

    db.db("HP-Characters").collection("personajes").find(sentencia).toArray(function(err, result) {
      if (err) throw eer;

      let final = cuerpo(titulo);
      for (let i = 0; i < result.length; i++) {
        final += (tablaCuerpo(result, i));
      }
      final += ('</div></div></div></tbody></table>');

      respuesta.write(final);
      db.close()
    })
  })
}

function tablaCuerpo(result, i) {
  let nombre = JSON.stringify(result[i].name);
  let especie = JSON.stringify(result[i].species);

  let final = ('<tr>'
    +  '<th scope="row">' + nombre + '</th>'
    +  '<td>' + especie + '</td>'
    +'</tr>');

  return final;
}

function cuerpo(busqueda) {
  let final = ('<!doctype html>'
    + '<html lang="es">'
    +  '<head>'
    +    '<!-- Required meta tags -->'
    +    '<meta charset="utf-8">'
    +    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">'
    +    '<!-- Bootstrap CSS -->'
    +    '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">'
    +    '<link rel="stylesheet" href="formulario.css">'
    +    '<title>' + busqueda + '</title>'
    +    '<link rel="stylesheet" href="fontawesome/css/all.css">'
    +    '<link href="https://fonts.googleapis.com/css?family=Black+Ops+One|Bungee+Inline|Fredericka+the+Great|IM+Fell+English+SC|Reenie+Beanie&display=swap" rel="stylesheet">' 
    +  '</head>'
    +  '<body>'
    +      '<div class="container mt-4">'
    +        '<div class="row">'
    +          '<div class="col-8 text"></div>'
    +           '<h1>' + busqueda + '</h1>'
    +            '<table class="table">'
                    + '<thead class="thead-dark">'
                    +  '<tr>'
                    +    '<th scope="col">Nombre</th>'
                    +    '<th scope="col">Especie</th>'
                    +  '</tr>'
                    + '</thead>'
                    + '<tbody>');
    return final;
}