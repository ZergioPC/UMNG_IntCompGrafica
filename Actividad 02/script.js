import {rta} from "./parte1.js";

const $rta1 = document.querySelector("#rta_1");
const $rta2 = document.querySelector("#rta_2");
const $rta3 = document.querySelector("#rta_3");

function insert(x,div){
    let frag = document.createDocumentFragment();
    let aux = frag.appendChild(document.createElement("ul"))

    for(let i=0; i<x.length; i++){
        let e = x[i];
        aux.innerHTML +=
        `<li>
            <h4>${e.titulo}</h4>
            <h5>by ${e.autor}</h5>
            <p>${e.apa}</p>
            <a href="${e.url}">Enlace al Documento</a>
        </li>`;
    }
    div.appendChild(frag);
};

function glosario(x,div){
    let frag = document.createDocumentFragment();
    let aux = frag.appendChild(document.createElement("ol"))

    for(let i=0; i<x.length; i++){
        let e = x[i];
        aux.innerHTML +=
        `<li>
            <p class="dic_bold">${e.word}:</p>
            <p clas="dic_rta">${e.p}</p>
        </li>`;
    }
    div.appendChild(frag);
}

insert(rta.books,$rta1);
insert(rta.extras,$rta2);
glosario(rta.glosario,$rta3);