console.log('votacion');

import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';
const db = await openDB('appVotacion', 1);

let nro = document.getElementById('nro');
let pregunta = document.getElementById('pregunta');

let btnAnt = document.getElementById("btnAnt");
let btnSgt = document.getElementById("btnSgt");

let votarSI = document.getElementById("votarSI");
let votarNO = document.getElementById("votarNO");
let votar = document.getElementById("votar");

let preguntaActual;
let respuestaActual = [];

let indice = 0;
let total = 0;
btnAnt.disabled = true;

async function getAllPreguntas(indice){
    let resultado = await db.getAll('preguntas');
    total = 0;
    for (let i = 0; i < resultado.length; i++) {
        total++;
        //respuestaActual.push({idPregunta:resultado[i].id,si:false, no:false, blanco:true});
    }
    preguntaActual = resultado[indice];
    nro.innerHTML = `Pregunta: ${indice+1}`;
    pregunta.innerHTML = `${preguntaActual.pregunta}`;    
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
    votarSI.className = "btn btn-outline-primary btn-lg";
    votarNO.className = "btn btn-outline-primary btn-lg";
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

votarSI.addEventListener('click', ()=>{ 
    respuestaActual.splice(indice, 1,{
        idPregunta: preguntaActual.id,
        si : true,
        no : false,
        blanco: false
    });
    console.table(respuestaActual);
    votarSI.className = "btn btn-primary btn-lg";
    votarNO.className = "btn btn-outline-primary btn-lg";
});

votarNO.addEventListener('click', ()=>{   
    respuestaActual.splice(indice, 1, {
        idPregunta: preguntaActual.id,
        si : false,
        no : true,
        blanco: false
    });
    console.table(respuestaActual);
    votarNO.className = "btn btn-primary btn-lg";
    votarSI.className = "btn btn-outline-primary btn-lg";
});

votar.addEventListener('click', async ()=>{ 
    for (let i = 0; i < respuestaActual.length; i++) {
        const fila = respuestaActual[i];
        console.log(fila);    
        await db.add('respuestas', {
            fila
        });
    }
    swal("Correcto!", "Registro Completado!", "success");
});