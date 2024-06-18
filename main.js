import {mapa as mapa_class,player as player_class,dialogo} from './world.js'; 
import {props,npcs} from './entities.js';

const $canvas = document.getElementById('canvas');
    const lienzo ={
        ancho:$canvas.width,
        alto:$canvas.height
    };
const ctx = $canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

const mapa = new mapa_class(ctx,720/10,480/10,lienzo.ancho,lienzo.alto,'/img/mapa.png');
const casillas = {x:80,y:80};
const player = new player_class(ctx,'/img/player_walk.png','/img/player_run.png',80,lienzo)
const dialogoBox = new dialogo(ctx);

const vel = 8;
let animation = false;

const delta_time = 50;
let stopTime = 10;

let pointer = [0,0];
const coords = {x:0,y:0};
const pos_mapa = {x:0,y:0};
const pos_player = {x:0,y:0};
const pos_global = {x:0,y:0};

const colisionList = props.colisions;
const npcList = npcs;

let colision = false;
let action = false;

//MARK: Fisicas y Mecanicas
let direccion = 'sur';
const direccion_list = {
    norte: 0,
    sur: 3,
    oeste: 2,
    este: 1
}

//1. Ubicar Npcs
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
    for(let u=0; u < colisionList.length; u++){
        for (let i = 0; i < colisionList[u].length; i++) {
            if(vectY == colisionList[u][i][1] && vectX == colisionList[u][i][0]){ 
                colision = true;
                break;
            }else{
                colision = false; 
            }
        }
        if(colision == true){
            break;
        }
    }
}

function npcEvent(vectX,vectY){
    for(let u=0; u < npcList.length; u++){
        for (let i = 0; i < npcList[u].actZone.length; i++) {
            if(vectY == npcList[u].actZone[i][1] && vectX == npcList[u].actZone[i][0]){ 
                action = true;
                npcList[u].frame = direccion_list[direccion];
                dialogoBox.texto = npcList[u].dialogo;
                dialogoBox.display = true;
                break;
            }
        }
        if(action == true){
            break;
        }
    }
}

//MARK: Controles
let keyPress = true;
let keyName;

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
        pointer = [coords.x,coords.y-1];
        checkColision(coords.x,coords.y-1);
        direccion = 'norte';
    }],
    ['KeyA', function(){
        pointer = [coords.x-1,coords.y];
        player.animation = 1;
        checkColision(coords.x-1,coords.y);
        direccion = 'oeste';
    }],
    ['KeyS', function(){
        pointer = [coords.x,coords.y+1];
        player.animation = 0;
        checkColision(coords.x,coords.y+1);
        direccion = 'sur';
    }],
    ['KeyD', function(){
        pointer = [coords.x+1,coords.y]
        player.animation = 2;
        checkColision(coords.x+1,coords.y);
        direccion = 'este';
    }]
]);

//#region 2. Activar función de moverse
const movimientos = new Map([
    ['KeyW', function(dir){
        if(!colision && !action){
            const posiciones = moverse(pos_mapa.y,pos_player.y,(-dir),(pos_global.y-dir < 240),(pos_player.y > 0));
            pos_mapa.y = posiciones.mapa;
            pos_player.y = posiciones.player;
        }
    }],
    ['KeyA', function(dir){
        if(!colision && !action){
            const posiciones = moverse(pos_mapa.x,pos_player.x,(-dir),(pos_global.x-dir < 320),(pos_player.x > 0));
            pos_mapa.x = posiciones.mapa;
            pos_player.x = posiciones.player;
        }
    }],
    ['KeyS', function(dir){
        if(!colision && !action){
            const posiciones = moverse(pos_mapa.y,pos_player.y,(+dir),(pos_global.y+dir > 1760),(pos_player.y < 0));
            pos_mapa.y = posiciones.mapa;
            pos_player.y = posiciones.player;
        }
    }],
    ['KeyD', function(dir){
        if(!colision && !action){
            const posiciones = moverse(pos_mapa.x,pos_player.x,(+dir),(pos_global.x+dir > 3600),(pos_player.x < 0));
            pos_mapa.x = posiciones.mapa;
            pos_player.x = posiciones.player;
        }
    }]
]);

const acciones = new Map([
    ['Space',function(){
        if(!action){
            npcEvent(pointer[0],pointer[1]);
        }else{
            if(dialogoBox.display){
                setTimeout(()=>{
                    action = dialogoBox.nextLine();
                },100)
            }
        }
    }]
]);

//#region 3. detection de señales

setInterval(()=>{
    coords.x = Math.floor((pos_mapa.x + pos_player.x + 320)/casillas.x)+1;
    coords.y = Math.floor((pos_mapa.y + pos_player.y + 240)/casillas.y)+1;
    pos_global.x = pos_mapa.x + pos_player.x + 320;
    pos_global.y = pos_mapa.y + pos_player.y + 240;
},delta_time);


document.addEventListener('keydown',(e)=>{
    //console.log(e.code);
    if(movimientos.has(e.code)){
        if(keyPress){
            
            keyPress = false;
            keyName = e.code;
            
            direcciones.get(keyName)();
                
            if(e.shiftKey == true){
                player.img = player.runSp;
                stopTime = 5;
            }else{
                player.img = player.walkSp;
                stopTime = 10;
            }
            
            const move = setInterval(()=>{
                if(movimientos.has(keyName)){
                    if(e.shiftKey == true){
                        movimientos.get(keyName)(vel*2);
                    }else{
                        movimientos.get(keyName)(vel);
                    }
                    animation = true;
                }
            },delta_time);
            
            setTimeout(()=>{
                clearInterval(move);
                animation = false;
                keyPress = true;
            },(delta_time*stopTime))
        }
    }else if(acciones.has(e.code)){
        //console.log(keyPress);
        acciones.get(e.code)();
    }else{
        keyPress = true;
    }
});


//MARK: Render
/* 
setInterval(()=>{
    if(mapa.frame == 5){
        mapa.frame = 0;
    }else{
        mapa.frame++;
    }

    if(animation){
        if(player.frame == 3){
            player.frame = 0;
        }else{
            player.frame++;
        }
    }else{
        player.frame = 0;
    }
},120);
 */

//#region 1. canvas
setInterval(()=>{
    ctx.reset();
    ctx.imageSmoothingEnabled = false;
    mapa.draw(pos_mapa.x,pos_mapa.y);
    player.drawCtx(pos_player.x,pos_player.y);
    drawNPCs(pos_mapa.x,pos_mapa.y);
    dialogoBox.draw();
},60);


/* 
//MARK: Print datos
setInterval(()=>{
    console.clear();
    console.log(`x: ${coords.x}  y: ${coords.y}`);
    //console.log(pos_global);
},500);
*/