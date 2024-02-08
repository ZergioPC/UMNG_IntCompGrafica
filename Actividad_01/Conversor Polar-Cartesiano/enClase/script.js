//Variables selectoras del HTML
const $section_sel = document.querySelector("#select");
const $section_conv = document.querySelector("#convert");

const $btn_toCart = document.querySelector("#toCart");
const $btn_toPolar = document.querySelector("#toPolar");;
const $btn_convert = document.querySelector("#btn_convert");
const $btn_volver = document.querySelector("#btn_back");

const $num1 = document.querySelector("#imputX");
const $num2 = document.querySelector("#imputY");

const $span_option = document.querySelector("#option");
const $span_optionRt = document.querySelector("#option_rt");
const $span_req = document.querySelector("#req");
const $span_res = document.querySelector("#res");

const $p_rta = document.querySelector(".rta");
const $p_coord1 = document.querySelector("#coord1");
const $p_coord2 = document.querySelector("#coord2");

//Variables Internas
let select = null;

//Algoritmos de Conversión
function convertPolar(x,y){
    let r = Math.sqrt((x*x)+(y*y));
    let a = (Math.atan(y/x))*(180/Math.PI);
    return [r.toFixed(2),a.toFixed(2)];
};

function convertCart(r,a){
    let x = r*Math.cos(a);
    let y = r*Math.sin(a);
    return[x.toFixed(2),y.toFixed(2)];
}

//Selecvionar Conversión
$btn_toCart.addEventListener("click",()=>{
    select = "cartesianas";
    $span_option.innerHTML = "polares";
    $p_coord1.innerHTML = "<i>r</i>";
    $p_coord2.innerHTML = "&#952;";
    $section_sel.classList.add("off");
    $section_conv.classList.remove("off");
});

$btn_toPolar.addEventListener("click",()=>{
    select = "polares";
    $span_option.innerHTML = "cartesianas";
    $p_coord1.innerHTML = "<i>x</i>";
    $p_coord2.innerHTML = "<i>y</i>";
    $section_sel.classList.add("off");
    $section_conv.classList.remove("off");
});

//Volver al Menú
$btn_volver.addEventListener("click",()=>{
    select = null;
    $section_conv.classList.add("off");
    $btn_volver.classList.add("off");
    $section_sel.classList.remove("off");
    $p_rta.classList.add("off");
});

//Conversión
function htmlInsert(rta){
    let aux;
    let aux2;

    if(select == "cartesianas"){
        aux = `${$num2.value}°`;
    }else{
        aux = $num2.value;
    }

    if(select == "polares"){
        aux2 = `${rta[1]}°`;
    }else{
        aux2 = rta[1];
    }

    $span_optionRt.innerHTML = select;
    $span_req.innerHTML = `(${$num1.value},${aux})`;
    $span_res.innerHTML = `(${rta[0]},${aux2})`;
}

$btn_convert.addEventListener("click",()=>{
    let rta;

    switch(select){
        case "cartesianas":
            rta = convertCart(parseFloat($num1.value),parseFloat($num2.value));
            break;
        case "polares":
            rta = convertPolar(parseFloat($num1.value),parseFloat($num2.value));
            break;
    }
    
    htmlInsert(rta);
    $p_rta.classList.remove("off");
    $btn_volver.classList.remove("off");
});