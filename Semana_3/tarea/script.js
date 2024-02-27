const $btn = document.querySelector("#btn");
let $btnStat = false;

const $sec_siClass = document.querySelector("#sec_siClass");
const $sec_noClass = document.querySelector("#sec_noClass");

/* Botones */
$btn.addEventListener("click",()=>{
    if($btnStat == false){
        $btn.innerText = "Con Clases";
        $btnStat = true;

        $sec_noClass.classList.add("off");
        $sec_siClass.classList.remove("off");
    }else if($btnStat == true){
        $btn.innerText = "Sin Clases";
        $btnStat = false;

        $sec_siClass.classList.add("off");
        $sec_noClass.classList.remove("off");
    }
});

/* Insertar Codigo Python */
const $sinClass = document.querySelector("#sinClass");
const $class = document.querySelector("#class");
const $menu = document.querySelector("#menu");

$sinClass.innerHTML="";
    fetch('./tarea_01.py')
    .then(res => res.text())
    .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => $sinClass.innerHTML+=`${line}<br>`);
    });

$menu.innerHTML="";
    fetch('./tarea_02_Proceso.py')
    .then(res => res.text())
    .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => $menu.innerHTML+=`${line}<br>`);
    });

$class.innerHTML="";
    fetch('./tarea_02_Clases.py')
    .then(res => res.text())
    .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => $class.innerHTML+=`${line}<br>`);
    });