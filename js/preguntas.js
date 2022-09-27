console.log('preguntas');

document.getElementById("btnEnviar").addEventListener('click', procesar);
let listaPreguntas = document.getElementById("listaPreguntas");

function limpiarFormulario(){
    document.getElementById('pregunta').value = '';
    document.getElementById('ordenPregunta').value = '1';
}

import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';
const db = await openDB('appVotacion', 1);

async function procesar(e){
    e.preventDefault();

    let pregunta = document.getElementById('pregunta').value;
    let ordenPregunta = document.getElementById('ordenPregunta').value;

    await db.add('preguntas', {
        pregunta,
        orden:ordenPregunta,
        date: new Date()    
    });
    listaPreguntas.innerHTML = ``;
    getAllPreguntas();
    limpiarFormulario();
    swal("Correcto!", "Registro Completado!", "success");
}

async function getAllPreguntas(){
    let resultado = await db.getAll('preguntas');
    let i = 0;
    for (const item in resultado) {        
        i++;
        const fila = resultado[item];
        listaPreguntas.innerHTML = listaPreguntas.innerHTML + `
            <tr>
                <th scope="row" hidden>${fila.id}</th>
                <th>${i}</th>
                <td>${fila.pregunta}</td>
                <td>${fila.orden}</td>
                <td>                    
                    <a href="javascript:void(0)" class="btn btn-outline-danger"><i class="fa fa-times"></i> Quitar</a>
                </td>
            </tr> 
        `;
    } 
    
}
 
getAllPreguntas();


listaPreguntas.addEventListener('click', tabla);

function tabla(e){   
    if(e.target.nodeName== 'A' || e.target.nodeName== 'I'){
        if(e.target.innerHTML.includes('Editar') || e.target.className.includes('edit')){
            let id = e.path[2].childNodes[1].innerHTML;
            console.log(id);

        }
        if(e.target.innerHTML.includes('Quitar') || e.target.className.includes('times')){
            let id = e.path[2].childNodes[1].innerHTML;
            console.log(id);
            eliminarPregunta(id);
        }
    }    
    
}
async function eliminarPregunta(id){
    await db.delete('preguntas',Number(id));
    listaPreguntas.innerHTML = ``;
    getAllPreguntas();
}