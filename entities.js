import { edificio,stand,objeto,fuente as fuente_class} from "./colisiones.js";
import {npc} from './world.js'; 
import {dialogos as txt} from './dialogos.js';

/*  */
const $img = document.querySelectorAll('#loadImg img');
/*  */

const $canvas = document.getElementById('canvas');
const ctx = $canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

//MARK: Colisiones
const frontera_izq = new edificio(0,1,16,25);
const frontera_der = new edificio(50,51,16,25);
const frontera_bot = new edificio(0,50,25,26);

const lago_top = new edificio(0,50,0,3);
const lago_izq = new edificio(0,3,4,16);
const lago_der = new edificio(47,50,4,16);

//#region 1. NPCs
const npc_juan = new npc(ctx,$img[11],80,[33,5],txt.juan,$img[3]);
const npc_julian = new npc(ctx,$img[12],80,[25,10],txt.julian,$img[4]);
const npc_sofia = new npc(ctx,$img[13],80,[31,16],txt.sofia,$img[5]);

//#region 2. Stands
const semana1 = new stand(ctx,33,13,'Semana_1',$img[16]);
const semana2 = new stand(ctx,38,13,'Semana_2',$img[17]);
const semana3 = new stand(ctx,43,13,'Semana_3',$img[18]);

const semana4 = new stand(ctx,19,13,'Semana_4',$img[19]);
const semana5 = new stand(ctx,14,13,'Semana_5',$img[20]);

const semana6 = new stand(ctx,14,5,'Semana_6',$img[21]);
const semana7 = new stand(ctx,8,5,'Semana_7',$img[22]);

const semana8 = new stand(ctx,38,5,'Semana_8',$img[23]);
const semana9 = new stand(ctx,43,5,'Semana_9',$img[24]);

//#region 3. Arboles
const arbol_1 = new objeto(ctx,3,21,47,$img[2]);
const arbol_2 = new objeto(ctx,2,19,47,$img[2]);
const arbol_3 = new objeto(ctx,1,21,47,$img[2]);
const arbol_5 = new objeto(ctx,3,17,47,$img[2]);
const arbol_6 = new objeto(ctx,4,19,47,$img[2]);
const arbol_7 = new objeto(ctx,5,17,47,$img[2]);
const arbol_8 = new objeto(ctx,6,19,47,$img[2]);
const arbol_9 = new objeto(ctx,7,17,47,$img[2]);
const arbol_10 = new objeto(ctx,8,19,47,$img[2]);
const arbol_11 = new objeto(ctx,9,17,47,$img[2]);
const arbol_12 = new objeto(ctx,10,19,47,$img[2]);
const arbol_13 = new objeto(ctx,11,17,47,$img[2]);
const arbol_14 = new objeto(ctx,12,19,47,$img[2]);
const arbol_15 = new objeto(ctx,13,17,47,$img[2]);
const arbol_4 = new objeto(ctx,14,19,47,$img[2]);

const arbol_16 = new objeto(ctx,48,21,47,$img[2]);
const arbol_17 = new objeto(ctx,49,19,47,$img[2]);
const arbol_18 = new objeto(ctx,50,21,47,$img[2]);
const arbol_19 = new objeto(ctx,48,17,47,$img[2]);
const arbol_20 = new objeto(ctx,47,19,47,$img[2]);
const arbol_21 = new objeto(ctx,46,17,47,$img[2]);
const arbol_22 = new objeto(ctx,45,19,47,$img[2]);
const arbol_23 = new objeto(ctx,44,17,47,$img[2]);
const arbol_24 = new objeto(ctx,43,19,47,$img[2]);
const arbol_25 = new objeto(ctx,42,17,47,$img[2]);
const arbol_26 = new objeto(ctx,41,19,47,$img[2]);
const arbol_27 = new objeto(ctx,40,17,47,$img[2]);
const arbol_28 = new objeto(ctx,39,19,47,$img[2]);
const arbol_29 = new objeto(ctx,38,17,47,$img[2]);
const arbol_30 = new objeto(ctx,37,19,47,$img[2]);

const arbol_37 = new objeto(ctx,8,8,47,$img[2]);
const arbol_31 = new objeto(ctx,9,8,47,$img[2]);
const arbol_32 = new objeto(ctx,10,8,47,$img[2]);
const arbol_33 = new objeto(ctx,11,8,47,$img[2]);

const arbol_38 = new objeto(ctx,8,13,47,$img[2]);
const arbol_34 = new objeto(ctx,9,13,47,$img[2]);
const arbol_35 = new objeto(ctx,10,13,47,$img[2]);
const arbol_36 = new objeto(ctx,11,13,47,$img[2]);

//#region 3. Decoración
const fuente = new fuente_class(ctx,26,9,80,280,$img[9]);

//MARK: Exports
const props = {
    colisions : [
        frontera_izq.zona,
        frontera_der.zona,
        frontera_bot.zona,
        lago_top.zona,
        lago_izq.zona,
        lago_der.zona,
        arbol_1.zona,
        arbol_2.zona,
        arbol_3.zona,
        arbol_4.zona,
        arbol_5.zona,
        arbol_6.zona,
        arbol_7.zona,
        arbol_8.zona,
        arbol_9.zona,
        arbol_10.zona,
        arbol_11.zona,
        arbol_12.zona,
        arbol_13.zona,
        arbol_14.zona,
        arbol_15.zona,
        arbol_16.zona,
        arbol_17.zona,
        arbol_18.zona,
        arbol_19.zona,
        arbol_20.zona,
        arbol_21.zona,
        arbol_22.zona,
        arbol_23.zona,
        arbol_24.zona,
        arbol_25.zona,
        arbol_26.zona,
        arbol_27.zona,
        arbol_28.zona,
        arbol_29.zona,
        arbol_30.zona,
        arbol_31.zona,
        arbol_32.zona,
        arbol_33.zona,
        arbol_34.zona,
        arbol_35.zona,
        arbol_36.zona,
        arbol_37.zona,
        arbol_38.zona,
        semana1.zona,
        semana2.zona,
        semana3.zona,
        semana4.zona,
        semana5.zona,
        semana6.zona,
        semana7.zona,
        semana8.zona,
        semana9.zona,
        fuente.zona,
        npc_juan.zona,
        npc_julian.zona,
        npc_sofia.zona,
    ],
    stands : [
        semana1,
        semana2,
        semana3,
        semana4,
        semana5,
        semana6,
        semana7,
        semana8,
        semana9
    ],
    arboles : [
        arbol_1,
        arbol_2,
        arbol_3,
        arbol_4,
        arbol_5,
        arbol_6,
        arbol_7,
        arbol_8,
        arbol_9,
        arbol_10,
        arbol_11,
        arbol_12,
        arbol_13,
        arbol_14,
        arbol_15,
        arbol_16,
        arbol_17,
        arbol_18,
        arbol_19,
        arbol_20,
        arbol_21,
        arbol_22,
        arbol_23,
        arbol_24,
        arbol_25,
        arbol_26,
        arbol_27,
        arbol_28,
        arbol_29,
        arbol_30,
        arbol_31,
        arbol_32,
        arbol_33,
        arbol_34,
        arbol_35,
        arbol_36,
        arbol_37,
        arbol_38
    ],
    fuente : fuente
}

const npcs = [
    npc_juan,
    npc_julian,
    npc_sofia
];

export {props,npcs};