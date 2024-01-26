const $boton = document.querySelector("#boton");

const $numero1 = document.querySelector("#n1");
const $numero2 = document.querySelector("#n2");

const $span = document.querySelector("#resultado");


let rta;

function divisores(numero){
    let aux = [];
    let suma = 0;

    for(let i = 0; i<numero; i++){
        if(numero%i == 0){
            aux.push(i);
        }
    }

    for(let i=0; i< aux.length; i++){
        suma = suma + aux[i];
    }

    return suma;
}

function amigos(n1,n2){
    aux1 = divisores(n1);
    aux2 = divisores(n2);

    if(aux1 == n2 && aux2 == n1){
        console.log(n1+" y "+n2+" SI son amigos")
        rta = true;
    }else{
        console.log(n1+" y "+n2+" NO son amigos")
        rta = false;
    }
}

$boton.addEventListener("click",()=>{
    amigos(parseInt($numero1.value),parseInt($numero2.value));

    if(rta == true){
        $span.innerHTML = `${$numero1.value} y ${$numero2.value} SI son amigos`;
        $span.classList.remove("off");
    }else{
        $span.innerHTML = `${$numero1.value} y ${$numero2.value} NO son amigos`;
        $span.classList.remove("off");
    }
})