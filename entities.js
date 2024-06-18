import { edificio,letrero } from "./colisiones.js";
import {npc} from './world.js'; 

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

//#region 1.NPCs
const test = new npc(ctx,'/img/npcTemplate.png',80,[6,5],'xd');

//MARK: Exports
const props = {
    colisions : [
        frontera_izq.zona,
        frontera_der.zona,
        frontera_bot.zona,
        lago_top.zona,
        lago_izq.zona,
        lago_der.zona,
        test.zona
    ]
}

const npcs = [
    test
];

export {props,npcs};