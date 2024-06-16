import {statico,animado,boton} from './canvas.js'

const $canvas_og = document.getElementById('canvas');
const $canvas = {
    width: $canvas_og.width,
    height: $canvas_og.height
};

const $ctx = $canvas_og.getContext('2d');
$ctx.imageSmoothingEnabled = false;

const $inicio = document.getElementById('inicio');
const $btn_inicio = document.querySelector('#inicio button');

const $menu = document.getElementById('menu');
const $btns_menu = document.querySelectorAll('#menu button');
const $img_menu = document.querySelectorAll('#menu img');
const $btn_volver = document.getElementById('start');

const $codigo = document.getElementById('codigo');
const $screen = document.getElementById('screen');

const $galeria = document.getElementById('galeria');

//MARK: Canvas
const bg = new statico($ctx,'./Img/fondo/background.png',0,0,$canvas.width,$canvas.height);

const pc = new statico($ctx,'./Img/fondo/Pc.png',200,80,600,400);

const teclado = new animado($ctx,'./Img/fondo/keyboard-sheet.png',140,500,730,100,0,1,70,17);

const window = {
    x: 20,
    y: 30,
    w: 300,
    h: 300
}
const window_rain = new animado($ctx,'./Img/fondo/window_bg.png',window.x,window.y,window.w,window.h,2,0,50,50);
const window_marco = new statico($ctx,'./Img/fondo/window_marco.png',window.x,window.y,window.w,window.h);
const window_flash = new statico($ctx,'./Img/fondo/window_flash.png',window.x,window.y,window.w,window.h);
window_flash.delta = 9999;

//#region boton
const btn_canvas = new boton($ctx,400,540,200,30,'volver');

$canvas_og.addEventListener('mousemove',(e)=>{
    if(btn_canvas.hover(e.clientX,e.clientY)){
        btn_canvas.bg = '#ffffff';
        btn_canvas.color = "#1e262e";
    }else{
        btn_canvas.bg = '#1e262e';
        btn_canvas.color = "#ffffff";
    }
});

//#region Animacion

setInterval(()=>{
    teclado.frame();    

},1400);

setInterval(()=>{
    window_rain.frame();    
},200);

setInterval(()=>{
    window_flash.rayo();
},4000);

//#region Render

setInterval(()=>{
    bg.draw();
    window_rain.animar();
    window_flash.draw();
    window_marco.draw();
    pc.draw();
    teclado.animar();
    btn_canvas.draw();
},100);


//MARK: Galeria
$img_menu.forEach(img =>{
    img.addEventListener('click',()=>{
        $galeria.children[0].src = img.src;
        $galeria.children[0].alt = img.alt;
        $galeria.style.display = 'flex';
    });
});

$galeria.children[1].addEventListener('click',()=>{
    $galeria.style.display = 'none';
});

//MARK: Salir del Codigo

$canvas_og.addEventListener('click',(e)=>{
    if(btn_canvas.hover(e.clientX,e.clientY)){
        $menu.style.display = 'flex';
        $btn_volver.style.display = 'block';
        setTimeout(()=>{
            $menu.classList.remove('anima_move_out');
            $codigo.classList.add('anima_move_in');
            $btn_volver.classList.remove('off');
        },10);
    }
});

//MARK: llamar al codigo

async function getCode(code){
    let url;
    
    switch(code){
        case 'line':
            url = './Codigo/DibujoLineas.py'
            break;
        case 'circle':
            url = './Codigo/DibujoCircunferencia.py'
            break;
    }

    const res = await fetch(url);
    const data = await res.text();

    $screen.style.whiteSpace = 'pre';
    $screen.innerText = data;
}

$btns_menu.forEach(btn =>{
    btn.addEventListener('click',()=>{
        getCode(btn.name);
        $menu.classList.add('anima_move_out');
        $codigo.classList.remove('anima_move_in');
        $btn_volver.classList.add('off');
        setTimeout(()=>{
            $menu.style.display = 'none';
            $btn_volver.style.display = 'none';
        },1100);
    });
})

//MARK: Animaciones

$btn_inicio.addEventListener('click',()=>{
    $inicio.classList.add('anima_move_out');
    $menu.classList.remove('anima_move_in');
    $menu.classList.remove('off');
    $btn_volver.style.display = 'block';
    setTimeout(()=>{
        $inicio.style.display = 'none';
        $btn_volver.classList.remove('off');
    },1100);
});

$btn_volver.addEventListener('click',()=>{
    $inicio.style.display = 'flex';
    $menu.classList.add('anima_move_in');
    $menu.classList.add('off');
    $btn_volver.classList.add('off');
    setTimeout(()=>{
        $inicio.classList.remove('anima_move_out');
        $btn_volver.style.display = 'none';
    },100);
});