const $btn_prev = document.getElementById('prev');
const $btn_next = document.getElementById('next');

const $section = document.getElementById('slider_section');
const $tarjetas_fill = document.querySelectorAll(".tarjet_fill");
const $tarjetas_clip = document.querySelectorAll(".tarjet_clip");

const $btn_back = document.getElementById('back');

const $div_relleno = document.getElementById('div_relleno'); 
const $div_recorte = document.getElementById('div_recorte'); 

const $btn_relleno = document.getElementById('btn_relleno');
const $btn_recorte = document.getElementById('btn_recorte');

let selection;
let index = 0;

//MARK: Seleccion tarjetas
$btn_relleno.addEventListener("click",()=>{
    $btn_prev.style.opacity = 0;
    $section.classList.remove("hide");

    $div_relleno.classList.remove("off");
    $btn_back.classList.remove("hide");

    selection = 0;
});

$btn_recorte.addEventListener("click",()=>{
    $btn_prev.style.opacity = 0;
    $section.classList.remove("hide");

    $div_recorte.classList.remove("off");
    $btn_back.classList.remove("hide");

    selection = 1;
});


$btn_back.addEventListener('click',()=>{
    index = 0;

    $section.classList.add("hide");
    $btn_back.classList.add("hide");
    
    setTimeout(()=>{
        if(!$div_relleno.classList.contains("off")){
            $div_relleno.classList.add("off");
        }

        if(!$div_recorte.classList.contains("off")){
            $div_recorte.classList.add("off");
        }

        slide(null);
    },200);
});

//MARK: Slide Tarjetas

for (let i = 0; i < $tarjetas_fill.length; i++) {
    $tarjetas_fill[i].style.transform =`translateX(${110*i}%)`;
}

for (let i = 0; i < $tarjetas_clip.length; i++) {
    $tarjetas_clip[i].style.transform =`translateX(${110*i}%)`;
}

function slide(dir){
    if($section.classList.contains('animation_SlideNext')){
        $section.classList.remove('animation_SlideNext')
    }
    if($section.classList.contains('animation_SlidePrev')){
        $section.classList.remove('animation_SlidePrev')
    }
    setTimeout(()=>{
        switch(dir){
            case 0:
                $section.classList.add('animation_SlideNext')
                break;
            case 1:
                $section.classList.add('animation_SlidePrev')
                break;
            default:
                break;
        }
    },10);
    setTimeout(()=>{
        switch(selection){
            case 0:
                for (let i = 0; i < $tarjetas_fill.length; i++) {
                    delta = i+(-index);
                    $tarjetas_fill[i].style.transform =`translateX(${110*delta}%)`;
                }
                break;
            case 1:
                for (let i = 0; i < $tarjetas_clip.length; i++) {
                    delta = i+(-index);
                    $tarjetas_clip[i].style.transform =`translateX(${110*delta}%)`;
                }
                break;
        }
    },200);
}

$btn_next.addEventListener("click",()=>{
    switch(selection){
        case 0:
            if(index != 2){
                index++
                slide(1);
                if(index == 2){
                    $btn_next.style.opacity = 0;
                }
                $btn_prev.style.opacity = 100;
            }
            break;
        case 1:
            if(index != 1){
                index++
                slide(1);
                if(index == 1){
                    $btn_next.style.opacity = 0;
                }
                $btn_prev.style.opacity = 100;
            }
            break;
    }
});

$btn_prev.addEventListener('click',()=>{
    if(index != 0){
        index--;
        slide(0);
        if(index == 0){
            $btn_prev.style.opacity = 0;
        }
        $btn_next.style.opacity = 100;
    }
});

// Llamar al codigo
const $codigo = document.querySelector('.codigo');

$codigo.children[0].addEventListener('click',()=>{
    $codigo.classList.add('off');
    $codigo.children[1].innerText = "";
});

const $btn_code_fill_flood = document.getElementById('btn_fill_flood');
const $btn_code_fill_line = document.getElementById('btn_fill_line');
const $btn_code_fill_poly = document.getElementById('btn_fill_poly');

const $btn_code_clip_line = document.getElementById('btn_clip_line');
const $btn_code_clip_poly = document.getElementById('btn_clip_poly');

async function getCodigo(url,element){
    await fetch(url)
    .then(res => res.text())
    .then(content => {
        element.style.whiteSpace = 'pre';
        element.innerText = content;
    });
};

$btn_code_fill_flood.addEventListener('click',()=>{
    $codigo.classList.remove('off');
    getCodigo('./Relleno/RE_FloodFill.py',$codigo.children[1]);
});

$btn_code_fill_line.addEventListener('click',()=>{
    $codigo.classList.remove('off');
    getCodigo('./Relleno/RE_ScanlineFill.py',$codigo.children[1]);
});

$btn_code_fill_poly.addEventListener('click',()=>{
    $codigo.classList.remove('off');
    getCodigo('./Relleno/RE_PolygonFill.py',$codigo.children[1]);
});

$btn_code_clip_line.addEventListener('click',()=>{
    $codigo.classList.remove('off');
    getCodigo('./Recorte/RE_LineClipping.py',$codigo.children[1]);
});

$btn_code_clip_poly.addEventListener('click',()=>{
    $codigo.classList.remove('off');
    getCodigo('./Recorte/RE_Polygon_Clipping.py',$codigo.children[1]);
});
