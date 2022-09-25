
// let url = 'https://m.sinosecu.com.cn/upload/20211109/KXatinZTpZ2Y56vt7GB.jpg';

// let res = document.getElementById('resultado');

// Tesseract.recognize( url,'eng', { 
//     logger: m => {
//         console.log(m);
//         res.innerHTML = 'Cargando...';
//     } 
// }).then((
//     { data: { text } }) => {
//         console.log(text);
//         res.innerHTML= text;
//     })

import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

const db = await openDB('appVotacion', 1, {
  upgrade(db) {
    db.createObjectStore('preguntas', {
      keyPath: 'id',
      autoIncrement: true,
    });
    db.createObjectStore('respuestas', {
      keyPath: 'id',
      autoIncrement: true,
    });
    db.createObjectStore('votantes', {
      keyPath: 'id',
      autoIncrement: true,
    });
  },
});

const {pathname} = window.location;

let clase1 = '';
let span1 = '';
let clase2='';
let span2='';
let clase3='';
let span3='';
let clase4='';
let span4='';

function urlActual (){  
  return pathname.replace('/','');
}

switch (urlActual()) {
  case 'index.html':
    clase1='active';
    span1='<span class="visually-hidden">(current)</span>';
    clase2='';
    span2='';
    clase3='';
    span3='';
    clase4='';
    span4='';
    break;
  case 'votacion.html':
    clase1='';
    span1='';
    clase2='active';
    span2='<span class="visually-hidden">(current)</span>';
    clase3='';
    span3='';
    clase4='';
    span4='';
    break;
  case 'resultados.html':
    clase1='';
    span1='';
    clase2='';
    span2='';
    clase3='active';
    span3='<span class="visually-hidden">(current)</span>';
    clase4='';
    span4='';
    break;
  case 'preguntas.html':
    clase1='';
    span1='';
    clase2='';
    span2='';
    clase3='';
    span3='';
    clase4='active';
    span4='<span class="visually-hidden">(current)</span>';
    break;
  default:
    clase1='';
    span1='';
    clase2='';
    span2='';
    clase3='';
    span3='';
    clase4='';
    span4='';
    break;
}

const cabecera = document.getElementById('cabecera');
cabecera.innerHTML = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Examen Final</title>
      <link rel="stylesheet" href="./css/bootstrap.min.css">
      <link rel="stylesheet" href="./css/style.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  </head>
  <body>  
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fondo">
          <div class="container-fluid">
            <a class="navbar-brand" href="index.html">Examen UAB | Votación</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
              <ul class="navbar-nav me-auto">
                <li class="nav-item">                      
                  <a class="nav-link ${clase1}" href="index.html"><i class="fa fa-home"></i> Inicio
                    ${span1}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link ${clase2}" href="votacion.html"><i class="fa fa-edit"></i> Votación
                    ${span2}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link ${clase3}" href="resultados.html"><i class="fa fa-dashboard"></i> Resultados
                    ${span3}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link ${clase4}" href="preguntas.html"><i class="fa fa-question"></i> Preguntas
                    ${span4}
                  </a>
                </li>
              </ul>            
            </div>
          </div>
      </nav>
`;


