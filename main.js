import {mapa as mapa_class,player as player_class,dialogo,alert as alert_class} from './world.js'; 
import {props,npcs} from './entities.js';

/*  */
const $img = document.querySelectorAll('#loadImg img');
/*  */

const $canvas = document.getElementById('canvas');
    const lienzo ={
        ancho:$canvas.width,
        alto:$canvas.height
    };
const ctx = $canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

const mapa = new mapa_class(ctx,720/10,480/10,lienzo.ancho,lienzo.alto,$img[10].src);
const casillas = {x:80,y:80};
const player = new player_class(ctx,$img[15].src,$img[14].src,80,lienzo)
const dialogoBox = new dialogo(ctx,$img[8].src,$img[7].src,$img[0].src);
const alertBox = new alert_class(ctx,$img[1].src,$img[0].src);

const vel = 8;
let playerAnimation = false;

const delta_time = 50;
let stopTime = 10;

let pointer = [0,0];
const coords = {x:0,y:0};
const pos_mapa = {x:1840,y:1040};
const pos_player = {x:0,y:0};
const pos_global = {x:0,y:0};

const colisionList = props.colisions;
const standList = props.stands;
const arbolList = props.arboles;
const npcList = npcs;

//MARK: Fisicas y Mecanicas

let colision = false;
let action = false;
let alert = false;
let canShift = true;
let shiftKey = false;


let direccion = 'sur';
const direccion_list = {
    norte: 0,
    sur: 3,
    oeste: 2,
    este: 1
}

let frame_arbol = 0;
let frame_fuente = 0;

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

function checkEvent(vectX,vectY){
    for(let u=0; u < standList.length; u++){
        for (let i = 0; i < standList[u].evento.length; i++) {
            if(vectY == standList[u].evento[i][1] && vectX == standList[u].evento[i][0]){ 
                alert = true;
                alertBox.semana = standList[u].semana;
                alertBox.enlace = standList[u].link;
                alertBox.display = true;
                break;
            }else{
                alert = false; 
            }
        }
        if(alert == true){
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
                dialogoBox.avatar = npcList[u].avatar;
                setTimeout(()=>{
                    dialogoBox.ready = true;
                },100);
                dialogoBox.display = true;
                break;
            }
        }
        if(action == true){
            break;
        }
    }
}

function defaultDirectionNPC(){
    for(let u=0; u < npcList.length; u++){
        npcList[u].frame = 0;
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
        if(!action && !alert){
            dialogoBox.ready = false;
            checkEvent(pointer[0],pointer[1])
            npcEvent(pointer[0],pointer[1]);
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
        if(canShift){
            canShift = false;

            if(shiftKey){
                shiftKey = false;
            }else{
                shiftKey = true;
            }

            if(shiftKey == true){
                player.img = player.runSp;
                stopTime = 5;
            }else{
                
                player.img = player.walkSp;
                stopTime = 10;
            }
            setTimeout(()=>{
                canShift = true;
            },200);
        }
    }],
    ['KeyQ',function(){
        console.log(`x: ${pos_mapa.x}  y: ${pos_mapa.y}`);
        console.log(`x: ${coords.x}  y: ${coords.y}`);
    }]
]);

//#region 3. detection de señales

setInterval(()=>{
    coords.x = Math.floor((pos_mapa.x + pos_player.x + 320)/casillas.x)+1;
    coords.y = Math.floor((pos_mapa.y + pos_player.y + 240)/casillas.y)+1;
    pos_global.x = pos_mapa.x + pos_player.x + 320;
    pos_global.y = pos_mapa.y + pos_player.y + 240;
},delta_time);


function eventListener(key){
    if(movimientos.has(key)){
        if(keyPress){    
            keyPress = false;
            keyName = key;
            
            direcciones.get(keyName)();      
            const move = setInterval(()=>{
                if(movimientos.has(keyName)){
                    if(shiftKey == true){
                        movimientos.get(keyName)(vel*2);
                    }else{
                        movimientos.get(keyName)(vel);
                    }
                    playerAnimation = true;
                }
            },delta_time);
            
            setTimeout(()=>{
                clearInterval(move);
                playerAnimation = false;
                
            },(delta_time*stopTime))

            setTimeout(()=>{
                keyPress = true;
            },(delta_time*stopTime)+10);
        }
    }else if(acciones.has(key)){
        if(keyPress){
            acciones.get(key)();
        }
    }else{
        keyPress = true;
    }
}

document.addEventListener('keydown',(e)=>{
    //console.log('xd');
    eventListener(e.code);
});

document.addEventListener("touchstart",(e)=>{
    //console.log(e.target.id);
    eventListener(e.target.id);
})


//MARK: Render

setInterval(()=>{
    if(mapa.frame == 5){
        mapa.frame = 0;
    }else{
        mapa.frame++;
    }

    if(playerAnimation){
        if(player.frame == 3){
            player.frame = 0;
        }else{
            player.frame++;
        }
    }else{
        player.frame = 0;
    }

    if(frame_arbol == 17){
        frame_arbol = 0;
    }else{
        frame_arbol++;
    }

    if(frame_fuente == 9){
        frame_fuente = 0;
    }else{
        frame_fuente++
    }
},120);


//#region 1. canvas
setInterval(()=>{
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
},60);


/* 
//MARK: Print datos
setInterval(()=>{
    console.clear();
    console.log(`x: ${coords.x}  y: ${coords.y}`);
    //console.log(pos_global);
},500);
*/