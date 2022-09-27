console.log('main');


let url = '../img/d1.jpeg';

let res = document.getElementById('resultado');

Tesseract.recognize( url,'eng', { 
    logger: m => {
        console.log(m);
        res.innerHTML = 'Cargando...';
    } 
}).then((
    { data: { text } }) => {
    console.log(text);
    res.innerHTML= text;
})