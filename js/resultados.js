console.log('resultados');

import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';
const db = await openDB('appVotacion', 1);

let listadoResp = document.getElementById('listaRespuestas');
let indice = 0;
let preguntaActual;
let totalVotos = 0;

async function getAllPreguntas(indice){
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
        
        if(i==indice){
            preguntaActual = {item, totalSI, totalNO, totalBLANCO};            
            cargaGrafico(preguntaActual);
        }

        totalVotos = Number(totalSI)+Number(totalNO)+Number(totalBLANCO);
        cargarTotal(totalVotos);

        listadoResp.innerHTML = listadoResp.innerHTML + `
            <tr>                
                <td class="text-center">${i+1}</td>
                <td>${item.pregunta}</td>                
                <td class="text-center">${totalSI}</td>
                <td class="text-center">${totalNO}</td>
                <td class="text-center">${totalBLANCO}</td>
                <td class="text-center">${totalSI+totalNO+totalBLANCO}</td>  
            </tr> 
        `;
    }     
}
 
getAllPreguntas(indice);

function cargaGrafico(preguntaActual){
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
            text: preguntaActual.item.pregunta
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45,
                dataLabels: {
                    enabled: true,
                    format: '{point.name} ({point.percentage:.1f}%)',
				    connectorWidth: 2
                }
            }
        },
        series: [{
            name: 'Total',
            data: [
                ['SI', preguntaActual.totalSI],
                ['NO', Number(preguntaActual.totalNO)],
                ['BLANCO', Number(preguntaActual.totalBLANCO)]
            ]
        }],
        credits: {
            enabled: false
        }, 
        tooltip:{
            useHTML: true,	
            headerFormat: '<h1>{point.key}</h1>',
            pointFormat: '<h4>{point.percentage:.1f} {series.name} </h4>',
        }
    });
}

function cargarTotal(totalVotos){
    console.log(totalVotos);
    document.getElementById('totalVotos').innerHTML = totalVotos;
}
