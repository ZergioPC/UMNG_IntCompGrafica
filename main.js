import { imgs, imgsReady } from './assets.js';
import { initInput, onPress } from './input.js';
import { TILE, VIEW_W, VIEW_H, STANDS, TREES, NPCS, FOUNTAIN } from './level.js';
import { Sprite } from './sprite.js';
import { Player } from './player.js';
import { NPC } from './npc.js';
import { DialogueBox, AlertBox } from './ui.js';
import { updateCamera } from './camera.js';
import { dialogos } from './dialogos.js';

// MARK: Canvas
const $canvas = document.getElementById('canvas');
const ctx = $canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// MARK: Entidades
const player = new Player(imgs.player_walk, imgs.player_run);
const npcs = NPCS.map((n) => new NPC({
    img: imgs[n.img],
    dialog: dialogos[n.dialog],
    avatar: imgs[n.avatar],
    faction: n.faction,
    tile: n.tile,
}));
const treeSprite = new Sprite(imgs.arbol, 47, 47, 18, 1);
const fountainSprite = new Sprite(imgs.Fuente, 80, 80, 10, 1);

const dialogue = new DialogueBox(imgs);
const alert = new AlertBox(imgs);

const camera = { x: 0, y: 0 };

// MARK: Maquina de estados
const STATE = { PLAY: 'PLAY', TALK: 'TALK', PROMPT: 'PROMPT' };
let state = STATE.PLAY;

const OPPOSITE = { norte: 'sur', sur: 'norte', este: 'oeste', oeste: 'este' };

// MARK: Interaccion
function pointInRect(p, r) {
    return p.x >= r.x && p.x < r.x + r.w && p.y >= r.y && p.y < r.y + r.h;
}

function standActZone(s) {
    return { x: (s.tile[0] + 1) * TILE, y: (s.tile[1] + 1) * TILE, w: 2 * TILE, h: TILE };
}

function tryInteract() {
    const probe = player.frontProbe;

    const npc = npcs.find((n) => pointInRect(probe, n.actZone));
    if (npc) {
        npc.face(OPPOSITE[player.dir]);
        dialogue.open(npc);
        state = STATE.TALK;
        return;
    }

    const stand = STANDS.find((s) => pointInRect(probe, standActZone(s)));
    if (stand) {
        alert.open(stand);
        state = STATE.PROMPT;
    }
}

function endDialogue() {
    state = STATE.PLAY;
    npcs.forEach((n) => n.resetFacing());
}

onPress('Space', () => {
    if (state === STATE.PLAY) {
        tryInteract();
    } else if (state === STATE.TALK) {
        if (!dialogue.next()) endDialogue();
    } else if (state === STATE.PROMPT) {
        alert.confirm();
    }
});

onPress('Escape', () => {
    if (state === STATE.TALK) {
        dialogue.close();
        endDialogue();
    } else if (state === STATE.PROMPT) {
        alert.close();
        state = STATE.PLAY;
    }
});

// MARK: Tick (fixed timestep)
function tick() {
    if (state === STATE.PLAY) {
        player.update();
    } else {
        player.setIdle();
    }
    updateCamera(camera, player);
}

// MARK: Animacion
let animAcc = 0;
const ANIM_DT = 120;
let mapFrame = 0;

function updateAnim(dt) {
    animAcc += dt;
    while (animAcc >= ANIM_DT) {
        animAcc -= ANIM_DT;
        mapFrame = (mapFrame + 1) % 6;
        treeSprite.advance();
        fountainSprite.advance();
        if (player.moving) player.sprite.advance();
        else player.sprite.frame = 0;
    }
}

// MARK: Render
function drawMap() {
    // mapa.png: 400x1200 -> 6 frames de 400x200. Escala 10 (source px / 10).
    ctx.drawImage(
        imgs.mapa,
        camera.x / 10,
        camera.y / 10 + 200 * mapFrame,
        72, 48,
        0, 0, VIEW_W, VIEW_H
    );
}

function render() {
    ctx.clearRect(0, 0, VIEW_W, VIEW_H);
    ctx.imageSmoothingEnabled = false;

    drawMap();

    const items = [];

    TREES.forEach(([tx, ty]) => items.push({
        y: ty * TILE + 40,
        draw: () => treeSprite.draw(ctx, tx * TILE - camera.x - 12, ty * TILE - camera.y - 60, 100, 100),
    }));

    STANDS.forEach((s) => items.push({
        y: s.tile[1] * TILE + 126,
        draw: () => ctx.drawImage(
            imgs[s.id],
            s.tile[0] * TILE - camera.x + 25,
            s.tile[1] * TILE - camera.y - 50,
            272, 176
        ),
    }));

    items.push({
        y: FOUNTAIN.tile[1] * TILE + 280,
        draw: () => fountainSprite.draw(
            ctx,
            FOUNTAIN.tile[0] * TILE - camera.x + 20,
            FOUNTAIN.tile[1] * TILE - camera.y,
            280, 280
        ),
    });

    npcs.forEach((n) => items.push({ y: n.baseY, draw: () => n.draw(ctx, camera.x, camera.y) }));
    items.push({ y: player.baseY, draw: () => player.draw(ctx, camera.x, camera.y) });

    items.sort((a, b) => a.y - b.y);
    items.forEach((item) => item.draw());

    dialogue.draw(ctx);
    alert.draw(ctx);
}

// MARK: Game loop (rAF + fixed timestep)
const FIXED_DT = 50;
let lastTime = performance.now();
let accumulator = 0;

function loop(now) {
    let dt = now - lastTime;
    lastTime = now;
    if (dt > 250) dt = 250;

    accumulator += dt;
    let steps = 0;
    while (accumulator >= FIXED_DT && steps < 5) {
        tick();
        accumulator -= FIXED_DT;
        steps++;
    }

    updateAnim(dt);
    render();
    requestAnimationFrame(loop);
}

// MARK: Bootstrap de secciones
function esDispositivoMovil() {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
        .test(navigator.userAgent.toLowerCase());
}

function setupSections() {
    const $inicio = document.getElementById('inicio');
    const $movil = document.getElementById('movil');
    const $pc = document.getElementById('pc');
    const $game = document.getElementById('game');
    const $controles = document.getElementById('controles');

    const $btnInicio = document.getElementById('inicio_out');
    const $btnMovil = document.getElementById('movil_out');
    const $btnPc = document.getElementById('pc_out');

    $btnInicio.addEventListener('click', () => {
        $btnInicio.blur();
        $inicio.style.display = 'none';
        if (esDispositivoMovil()) $movil.style.display = 'flex';
        else $pc.style.display = 'flex';
    });

    $btnMovil.addEventListener('click', () => {
        $btnMovil.blur();
        $movil.style.display = 'none';
        $game.style.display = 'block';
    });

    $btnPc.addEventListener('click', () => {
        $btnPc.blur();
        $pc.style.display = 'none';
        $game.style.display = 'block';
    });

    if (esDispositivoMovil()) {
        $canvas.classList.add('canvas_movil');
    } else {
        $canvas.classList.add('canvas_pc');
        $controles.style.display = 'none';
    }
}

setupSections();
initInput();

imgsReady().then(() => {
    requestAnimationFrame(loop);
});
