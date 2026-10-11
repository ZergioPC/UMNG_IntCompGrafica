import {mapa as mapa_class,player as player_class,dialogo,alert as alert_class} from './world.js'; 
import {props,npcs} from './entities.js';
import {imgs,imgsReady} from './assets.js';

const $canvas = document.getElementById('canvas');
const lienzo = {
    ancho: $canvas.width,
    alto: $canvas.height
};
const ctx = $canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const mapa = new mapa_class(ctx,720/10,480/10,lienzo.ancho,lienzo.alto,imgs.mapa);
const casillas = {x:80,y:80};
const player = new player_class(ctx,imgs.player_walk,imgs.player_run,80,lienzo);
const dialogoBox = new dialogo(ctx,imgs.dialogue_box,imgs.avatarTemplate,imgs.action_keys);
const alertBox = new alert_class(ctx,imgs.alert_box,imgs.action_keys);

const vel = 8;
const corrida = 2;

let playerAnimation = false;

let pointer = [0,0];
const coords = {x:0,y:0};
const pos_mapa = {x:1840,y:1040};
const pos_player = {x:0,y:0};
const pos_global = {x:0,y:0};

const colisionList = props.colisions;
const standList = props.stands;
const arbolList = props.arboles;
const npcList = npcs;

//MARK: Estado
let colision = false;
let action = false;
let alert = false;
let shiftKey = false;
let facing = 'sur';
let moveKey = null;

let frame_arbol = 0;
let frame_fuente = 0;

const direccion_list = {
    norte: 0,
    sur: 3,
    oeste: 2,
    este: 1
};

const vectorDireccion = {
    norte: [0,-1],
    sur: [0,1],
    oeste: [-1,0],
    este: [1,0]
};

//#region 1. Ubicación y Dibujado
props.fuente.x = ((props.fuente.origen[0]-1)*casillas.x);
props.fuente.y = ((props.fuente.origen[1]-1)*casillas.y);

for (let i = 0; i < arbolList.length; i++) {
    arbolList[i].x = ((arbolList[i].origen[0]-1)*casillas.x);
    arbolList[i].y = ((arbolList[i].origen[1]-1)*casillas.y);
}

function drawArboles(posX,posY,frame){
    for (let i = 0; i < arbolList.length; i++) {
        arbolList[i].draw(posX,posY,frame);
    }
}

for (let i = 0; i < standList.length; i++) {
    standList[i].x = ((standList[i].origen[0]-1)*casillas.x);
    standList[i].y = ((standList[i].origen[1]-1)*casillas.y);
}

function drawStands(posX,posY){
    for (let i = 0; i < standList.length; i++) {
        standList[i].draw(posX,posY);
    }
}

for (let i = 0; i < npcList.length; i++) {
    npcList[i].x = ((npcList[i].pos[0]-1)*casillas.x);
    npcList[i].y = ((npcList[i].pos[1]-1)*casillas.y);
}

function drawNPCs(posX,posY){
    for (let i = 0; i < npcList.length; i++) {
        npcList[i].draw(posX,posY);
    }
}

//#region 2. Colisiones
function checkColision(vectX,vectY){
    colision = false;
    for(let u=0; u < colisionList.length; u++){
        const zona = colisionList[u];
        for (let i = 0; i < zona.length; i++) {
            if(vectY === zona[i][1] && vectX === zona[i][0]){
                colision = true;
                return;
            }
        }
    }
}

function checkEvent(vectX,vectY){
    alert = false;
    for(let u=0; u < standList.length; u++){
        for (let i = 0; i < standList[u].evento.length; i++) {
            if(vectY === standList[u].evento[i][1] && vectX === standList[u].evento[i][0]){
                alert = true;
                alertBox.semana = standList[u].semana;
                alertBox.enlace = standList[u].link;
                alertBox.display = true;
                return;
            }
        }
    }
    alertBox.display = false;
}

function npcEvent(vectX,vectY){
    action = false;
    for(let u=0; u < npcList.length; u++){
        for (let i = 0; i < npcList[u].actZone.length; i++) {
            if(vectY === npcList[u].actZone[i][1] && vectX === npcList[u].actZone[i][0]){
                action = true;
                npcList[u].frame = direccion_list[facing];
                dialogoBox.texto = npcList[u].dialogo;
                dialogoBox.avatar = npcList[u].avatar;
                setTimeout(()=>{
                    dialogoBox.ready = true;
                },100);
                dialogoBox.display = true;
                return;
            }
        }
    }
    dialogoBox.display = false;
}

function defaultDirectionNPC(){
    for(let u=0; u < npcList.length; u++){
        npcList[u].frame = 0;
    }
}

function updatePointer(){
    const v = vectorDireccion[facing];
    pointer = [coords.x + v[0], coords.y + v[1]];
}

//MARK: Controles
function moverse(posMapa,posPlayer,direction,limite,desfase){
    if(limite || desfase){
        posPlayer = posPlayer + direction;
    }else{
        posMapa = posMapa + direction;
    }
    return {player: posPlayer,mapa: posMapa}
}

//#region 1. Dirección del Movimiento
const direcciones = new Map([
    ['KeyW', function(){
        player.animation = 3;
        facing = 'norte';
        checkColision(coords.x,coords.y-1);
    }],
    ['KeyA', function(){
        player.animation = 1;
        facing = 'oeste';
        checkColision(coords.x-1,coords.y);
    }],
    ['KeyS', function(){
        player.animation = 0;
        facing = 'sur';
        checkColision(coords.x,coords.y+1);
    }],
    ['KeyD', function(){
        player.animation = 2;
        facing = 'este';
        checkColision(coords.x+1,coords.y);
    }]
]);

//#region 2. Activar función de moverse
const movimientos = new Map([
    ['KeyW', function(dir){
        if(!colision && !action && !alert){
            const posiciones = moverse(pos_mapa.y,pos_player.y,(-dir),(pos_global.y-dir < 240),(pos_player.y > 0));
            pos_mapa.y = posiciones.mapa;
            pos_player.y = posiciones.player;
        }
    }],
    ['KeyA', function(dir){
        if(!colision && !action && !alert){
            const posiciones = moverse(pos_mapa.x,pos_player.x,(-dir),(pos_global.x-dir < 320),(pos_player.x > 0));
            pos_mapa.x = posiciones.mapa;
            pos_player.x = posiciones.player;
        }
    }],
    ['KeyS', function(dir){
        if(!colision && !action && !alert){
            const posiciones = moverse(pos_mapa.y,pos_player.y,(+dir),(pos_global.y+dir > 1760),(pos_player.y < 0));
            pos_mapa.y = posiciones.mapa;
            pos_player.y = posiciones.player;
        }
    }],
    ['KeyD', function(dir){
        if(!colision && !action && !alert){
            const posiciones = moverse(pos_mapa.x,pos_player.x,(+dir),(pos_global.x+dir > 3600),(pos_player.x < 0));
            pos_mapa.x = posiciones.mapa;
            pos_player.x = posiciones.player;
        }
    }]
]);

const acciones = new Map([
    ['Space',function(){
        if(!action && !alert){
            updatePointer();
            dialogoBox.ready = false;
            checkEvent(pointer[0],pointer[1]);
            if(!alert){
                npcEvent(pointer[0],pointer[1]);
            }
        }else{
            if(dialogoBox.display){
                dialogoBox.ready = false;
                setTimeout(()=>{
                    action = dialogoBox.nextLine();
                    if(!action){
                        defaultDirectionNPC();
                    }
                    dialogoBox.ready = true;
                },100)
            }
            if(alertBox.display){
                alertBox.enlace();
            }
        }
    }],
    ['Escape',function(){
            alert = false;
            alertBox.display = false;
        }
    ],
    ['ShiftLeft',function(){
        shiftKey = !shiftKey;
        if(shiftKey){
            player.img = player.runSp;
        }else{
            player.img = player.walkSp;
        }
    }],
    ['KeyQ',function(){
        console.log(`x: ${pos_mapa.x}  y: ${pos_mapa.y}`);
        console.log(`x: ${coords.x}  y: ${coords.y}`);
    }]
]);

//#region 3. Detection de señales

const MOVEMENT_KEYS = new Set(['KeyW','KeyA','KeyS','KeyD']);
const GAME_KEYS = new Set([...MOVEMENT_KEYS, ...acciones.keys()]);
const activeActions = new Set();

function tick(){
    coords.x = Math.floor((pos_mapa.x + pos_player.x + 320)/casillas.x)+1;
    coords.y = Math.floor((pos_mapa.y + pos_player.y + 240)/casillas.y)+1;
    pos_global.x = pos_mapa.x + pos_player.x + 320;
    pos_global.y = pos_mapa.y + pos_player.y + 240;

    if(moveKey && !action && !alert){
        direcciones.get(moveKey)();
        const paso = shiftKey ? vel*corrida : vel;
        movimientos.get(moveKey)(paso);
        playerAnimation = !colision;
    }else{
        playerAnimation = false;
    }
}

function keyDown(key){
    if(MOVEMENT_KEYS.has(key)){
        moveKey = key;
        direcciones.get(key)();
    }else if(acciones.has(key)){
        if(!activeActions.has(key)){
            activeActions.add(key);
            acciones.get(key)();
        }
    }
}

function keyUp(key){
    if(MOVEMENT_KEYS.has(key)){
        if(moveKey === key){
            moveKey = null;
        }
    }else if(acciones.has(key)){
        activeActions.delete(key);
    }
}

document.addEventListener('keydown',(e)=>{
    if(GAME_KEYS.has(e.code)){
        e.preventDefault();
    }
    keyDown(e.code);
});

document.addEventListener('keyup',(e)=>{
    if(GAME_KEYS.has(e.code)){
        e.preventDefault();
    }
    keyUp(e.code);
});

document.querySelectorAll('#controles button').forEach((btn)=>{
    const key = btn.id;
    const start = (e)=>{ e.preventDefault(); keyDown(key); };
    const end = (e)=>{ e.preventDefault(); keyUp(key); };
    btn.addEventListener('touchstart',start,{passive:false});
    btn.addEventListener('touchend',end,{passive:false});
    btn.addEventListener('touchcancel',end,{passive:false});
    btn.addEventListener('mousedown',start);
    btn.addEventListener('mouseup',end);
    btn.addEventListener('mouseleave',end);
});

//MARK: Render
let animAcc = 0;
const ANIM_DT = 120;

function updateAnim(dt){
    animAcc += dt;
    while(animAcc >= ANIM_DT){
        animAcc -= ANIM_DT;

        mapa.frame = (mapa.frame + 1) % 6;
        frame_arbol = (frame_arbol + 1) % 18;
        frame_fuente = (frame_fuente + 1) % 10;

        if(playerAnimation){
            player.frame = (player.frame + 1) % 4;
        }
    }

    if(!playerAnimation){
        player.frame = 0;
    }
}

function render(){
    ctx.reset();
    ctx.imageSmoothingEnabled = false;

    mapa.draw(pos_mapa.x,pos_mapa.y);
    player.drawCtx(pos_player.x,pos_player.y);

    drawNPCs(pos_mapa.x,pos_mapa.y);
    drawArboles(pos_mapa.x,pos_mapa.y,frame_arbol);
    props.fuente.draw(pos_mapa.x,pos_mapa.y,frame_fuente);
    drawStands(pos_mapa.x,pos_mapa.y);

    dialogoBox.draw();
    alertBox.draw();
}

//MARK: Game loop (rAF + fixed timestep)
const FIXED_DT = 50;
let lastTime = performance.now();
let acumulador = 0;

function loop(now){
    let dt = now - lastTime;
    lastTime = now;
    if(dt > 250){
        dt = 250;
    }

    acumulador += dt;
    let pasos = 0;
    while(acumulador >= FIXED_DT && pasos < 5){
        tick();
        acumulador -= FIXED_DT;
        pasos++;
    }

    updateAnim(dt);
    render();

    requestAnimationFrame(loop);
}

imgsReady().then(()=>{
    requestAnimationFrame(loop);
});
