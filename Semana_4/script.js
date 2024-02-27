let $menu = document.querySelector("#menu");
let $lib = document.querySelector("#libreria");

$menu.innerHTML="";
    fetch('./menu.py')
    .then(res => res.text())
    .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => $menu.innerHTML+=`${line}<br>`);
    });

$lib.innerHTML="";
    fetch('./graficador.py')
    .then(res => res.text())
    .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => $lib.innerHTML+=`${line}<br>`);
    });