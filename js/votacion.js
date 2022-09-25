console.log('votacion');

import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

let nro = document.getElementById('nro');
let pregunta = document.getElementById('pregunta');

let btnAnt = document.getElementById("btnAnt");
let btnSgt = document.getElementById("btnSgt");

const db = await openDB('appVotacion', 1);

let indice = 0;
let total = 0;

btnAnt.disabled = true;

async function getAllPreguntas(indice){
    let resultado = await db.getAll('preguntas');
    total = 0;
    for (let i = 0; i < resultado.length; i++) {
        total++;
    }
    const fila = resultado[indice];
    nro.innerHTML = `Pregunta: ${indice+1}`;
    pregunta.innerHTML = `${fila.pregunta}`;    
}

getAllPreguntas(indice);

btnSgt.addEventListener('click', ()=>{    
    if(indice<Number(total-1)){
        indice++;
        getAllPreguntas(indice);
        btnAnt.disabled = false;
    }
    if(indice==total-1){
        btnSgt.disabled = true;
    }
});

btnAnt.addEventListener('click', ()=>{    
    if(indice>0){
        indice--;
        getAllPreguntas(indice);
        btnSgt.disabled = false;
    }
    if(indice==0){
        btnAnt.disabled = true;
    }    
});