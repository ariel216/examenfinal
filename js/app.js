console.log('App..');

let url = 'https://m.sinosecu.com.cn/upload/20211109/KXatinZTpZ2Y56vt7GB.jpg';

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