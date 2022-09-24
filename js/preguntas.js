console.log('preguntas');

document.getElementById("btnEnviar").addEventListener('click', procesar);
let listaPreguntas = document.getElementById("listaPreguntas");

function limpiarFormulario(){
    pregunta = '';
    ordenPregunta = '1';
}

function procesar(e){
    e.preventDefault();

    let ordenPregunta = document.getElementById('pregunta').value;
    let pregunta = document.getElementById('ordenPregunta').value;

    console.log('orderPregunta: ', ordenPregunta);
    console.log('pregunta: ', pregunta);

}

import { openDB, deleteDB, wrap, unwrap } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

const db = await openDB('appVotacion', 1, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore('preguntas', {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
      // Create an index on the 'date' property of the objects.
      //store.createIndex('date', 'date');
    },
});

// agregar pregunta
async function  agregar (){
    await db.add('preguntas', {
        pregunta: 'Contenido de la pregunta....',
        orden:'1',
        date: new Date()    
    });
}


async function eliminarPregunta(id){
    await db.delete('preguntas',id);
    listarPreguntas();
}

//async function listarPreguntas(){
    let resultado = await db.getAll('preguntas');
    console.log(resultado);
    for (const item in resultado) {        
        const fila = resultado[item];
        listaPreguntas.innerHTML = listaPreguntas.innerHTML + `
            <tr>
                <th scope="row">${fila.id}</th>
                <td>${fila.pregunta}</td>
                <td>${fila.orden}</td>
                <td>
                    <a href="javascript:void(0)" class="btn btn-outline-warning"><i class="fa fa-edit"></i></a>
                    <a class="btn btn-outline-danger" onclick="eliminarPregunta(${fila.id})"><i class="fa fa-times"></i></a>
                </td>
            </tr> 
        `;
    } 
    
//}
 
//listarPreguntas();

