const btn = document.querySelector("#vector");
let ms;

btn.addEventListener("click",()=>{
    ms = prompt("Constraseña:");
    if(ms == "vector"){
        document.body.innerHTML = `<img class="vector" src="./IMG/vector.webp">`;
    }
});
