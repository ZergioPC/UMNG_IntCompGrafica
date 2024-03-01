const $codigo = document.querySelector("#code");

$codigo.innerHTML="";
    
    fetch('./code_python/parcial_1_practico.py')
    .then(res => res.text())
    .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => $codigo.innerHTML+=`${line}<br>`);
    });