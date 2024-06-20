const $canvas = document.getElementById('canvas');
const $controles = document.getElementById('controles');

const $sec_inicio = document.getElementById('inicio');
const $sec_tut_mov = document.getElementById('movil');
const $sec_tut_pc = document.getElementById('pc');
const $sec_game = document.getElementById('game');

const $btn_Inicio = document.getElementById('inicio_out');
const $btn_Tutorial_cel = document.getElementById('movil_out');
const $btn_Tutorial_pc = document.getElementById('pc_out');

function esDispositivoMovil() {
    const agenteUsuario = navigator.userAgent.toLowerCase();
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(agenteUsuario);
}

$btn_Inicio.addEventListener("click",()=>{
    $sec_inicio.style.display = "none";
    if (esDispositivoMovil()) {
        $sec_tut_mov.style.display = 'flex';
    } else {
        $sec_tut_pc.style.display = 'flex';
    }
})

$btn_Tutorial_cel.addEventListener('click',()=>{
    $sec_tut_mov.style.display = 'none';
    $sec_game.style.display = 'block';
});

$btn_Tutorial_pc.addEventListener('click',()=>{
    $sec_tut_pc.style.display = 'none';
    $sec_game.style.display = 'block';
});

if (esDispositivoMovil()) {
    $canvas.classList.add('canvas_movil');
} else {
    $canvas.classList.add('canvas_pc');
    $controles.style.display = 'none'
}