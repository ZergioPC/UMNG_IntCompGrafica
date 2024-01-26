//Variables selectoras del HTML
const $section_sel = document.querySelector("#select");
const $section_conv = document.querySelector("#convert");

const $btn_toCart = document.querySelector("#toCart");
const $btn_toPolar = document.querySelector("#toPolar");;
const $btn_convert = document.querySelector("#btn_convert");
const $btn_volver = document.querySelector("#btn_back");

const $x = document.querySelector("#imputX");
const $y = document.querySelector("#imputY");

const $span_option = document.querySelector("#option");
const $span_optionRt = document.querySelector("#option_rt");
const $span_req = document.querySelector("#req");
const $span_res = document.querySelector("#res");

//Variables Internas
let select;

function convertPolar(x,y){
    let r = Math.sqrt((x*x)+(y*y));
    let a = (Math.atan(y/x))*(180/Math.PI);
    return [r,a];
};

function convertCart(r,a){
    let x = r*Math.cos(a);
    let y = r*Math.sin(a);
    return[x.toFixed(2),y.toFixed(2)];
}

