/* Contenido e Información */

const inf =[
    {
        tit:"Mathplotlib",
        inf:"Librería comunmente utilizada para la graficación de funciones matemáticas.",
        pro:"Permite la visualización del comportamiento de una función, util cuando se realizan trabajos procedurales.",
        cont:"Se limita unicamente a dibujar gráficas con un enfoque matematico.",
        bib:"https://matplotlib.org/",
        img:"https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg"
    },
    {
        tit:"PyGame",
        inf:"Librería enfocada en facilitar el desarrollo de videojuegos en 2D.",
        pro:"Genera elementos en 2D, permitiendo modificar sus coordenadas, soporta eventos generados por el dispositivo en el que se ejecute el programa.",
        cont:"Simplifica varios procesos, los cuales limitan sus capacidades al momento de manipular comportamientos específicos.",
        bib:"https://www.pygame.org/docs/ref/draw.html",
        img:"https://user-images.githubusercontent.com/46412508/170405943-e75458ec-6cb4-462e-91ba-43c861a3d6cf.png"
    },{
        tit:"PyGlet",
        inf:"Librería cdiseñada para la creación de aplicaciones multimedia.",
        pro:"Proporciona una API para la creación de ventanas, manipulación de gráficos 2D y 3D, reproducción de audio y gestión de eventos de usuario.",
        cont:"Su API es poco flexible al momento de trabajar en tareas especificas",
        bib:"https://pyglet.org/",
        img:"https://upload.wikimedia.org/wikipedia/commons/f/f2/Pyglet_logo.png"
    },{
        tit:"Panda3D",
        inf:"Librería diseñada para la creación de juegos, simulaciones y aplicaciones interactivas en 3D.",
        pro:"Cuenta con un motor gráfico fuete, con motores de físicas integrados.",
        cont:"Es una librería compleja, lo cual requiere de trabajo adicional para implementar funcionalidades.",
        bib:"https://www.panda3d.org/",
        img:"https://avatars2.githubusercontent.com/u/590956?v=3&s=500"
    },{
        tit:"PythonArcade",
        inf:"Librería diseñada específicamente para el desarrollo de videojuegos 2D.",
        pro:"Proporciona una API simple y fácil de usar, incluye gestión de eventos y buena documentación.",
        cont:"Limitaciones en la complejidad de los gráficos, y su motor de físicas no suele ser suficiente para proyectos más avanzados.",
        bib:"https://api.arcade.academy/en/latest/",
        img:"https://api.arcade.academy/en/latest/_images/arcade-logo.svg"
    }
]

/* Variables */

const $container = document.querySelector(".container");
const $bibl = document.querySelector("#bibCont");

const $codigo = document.querySelector("#codigo");
const $btn_pyLine = document.querySelector("#py_line");
const $btn_pyCirc = document.querySelector("#py_circl");
const $btn_pyDraw = document.querySelector("#py_draw");
const $btn_pyClose = document.querySelector("#py_close");

/* Insertar Elementos - Desarrollo*/

for(let i=0; i<inf.length;  i++){
    
    $container.innerHTML += `
    <div class="label">
    <img src="${inf[i].img}"/>
        <h3>${inf[i].tit}</h3>
        <div class="vs">
            <div class="info">
                <p>${inf[i].inf}</p>
            </div>
            <div class="pros">
                <h4>Pros</h4>
                <p>${inf[i].pro}</p>
            </div>
            <div class="conts">
                <h4>Contras</h4>
                <p>${inf[i].cont}</p>
            </div>
        </div>
    </div>
    `;
}

/* Insertar Elementos - Bibliografía */

for(let i=0; i<inf.length; i++){
    $bibl.innerHTML+=`
            <li><a href="${inf[i].bib}">${inf[i].tit} Documentation</a></li>
    `;
}

/* Insertar Elementos - Archivos de python */
$btn_pyLine.addEventListener("click",()=>{
    $codigo.innerHTML="";
    
    fetch('./PYTHON_CODE/linea.py')
    .then(res => res.text())
    .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => $codigo.innerHTML+=`${line}<br>`);
    });
});

$btn_pyCirc.addEventListener("click",()=>{
    $codigo.innerHTML="";
    
    fetch('./PYTHON_CODE/circulo.py')
    .then(res => res.text())
    .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => $codigo.innerHTML+=`${line}<br>`);
    });
});

$btn_pyDraw.addEventListener("click",()=>{
    $codigo.innerHTML="";
    
    fetch('./PYTHON_CODE/dibujo.py')
    .then(res => res.text())
    .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => $codigo.innerHTML+=`${line}<br>`);
    });
});

$btn_pyClose.addEventListener("click",()=>{
    $codigo.innerHTML="";
    
    fetch('./PYTHON_CODE/cuadricula.py')
    .then(res => res.text())
    .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => $codigo.innerHTML+=`${line}<br>`);
    });
});