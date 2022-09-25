console.log('resultados');

import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';
const db = await openDB('appVotacion', 1);

let listadoResp = document.getElementById('listaRespuestas');
let resultado = [];

async function getAllPreguntas(){
    let respuestas = await db.getAll('respuestas');
    let preguntas = await db.getAll('preguntas');

    for (let i = 0; i < preguntas.length; i++) {
                
        const item = preguntas[i];
        let totalSI=0;
        let totalNO=0;
        let totalBLANCO=0;     
  
        //for(const itemResp in respuestas){            
        for (let j = 0; j < respuestas.length; j++) {
            let resp = respuestas[j].fila;
            if(Boolean(resp.si) && resp.idPregunta==item.id){
                totalSI++;
            }
            if(Boolean(resp.no && resp.idPregunta==item.id)){
                totalNO++;
            }
            if(Boolean(resp.blanco && resp.idPregunta==item.id)){
                totalBLANCO++;
            }
        }
        resultado.push({id: item.id, pregunta: item.pregunta, totalSI, totalNO, totalBLANCO});
           listadoResp.innerHTML = listadoResp.innerHTML + `
            <tr>                
                <td class="text-center">${i+1}</td>
                <td>${resultado[i].pregunta}</td>                
                <td class="text-center">${totalSI}</td>
                <td class="text-center">${totalNO}</td>
                <td class="text-center">${totalBLANCO}</td>
                <td class="text-center">${totalSI+totalNO+totalBLANCO}</td>  
            </tr> 
        `;
    }     
}
 
getAllPreguntas();

console.log(resultado);

Highcharts.chart('dona', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    exporting: { enabled: false },
    title: {
        text: 'resultado[0].pregunta'
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45
        }
    },
    series: [{
        name: 'Total',
        data: [
            ['SI', 16],
            ['NO', 12],
            ['BLANCO', 8]
        ]
    }]
});