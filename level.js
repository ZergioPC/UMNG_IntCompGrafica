// Datos del nivel. Mundo 50x25 tiles de 80px -> 4000x2000px.
// El terreno (fronteras/lago) vive en un Set "x,y" para consultas O(1).
// Las entidades (arboles, stands, fuente, NPCs) usan colliders AABB en px,
// con el borde superior a la altura del tile y el inferior recortado hasta
// los "pies" del sprite: asi se puede quedar detras desde arriba pero el
// jugador se acerca mas desde abajo.

export const TILE = 80;
export const COLS = 50;
export const ROWS = 25;
export const WORLD_W = COLS * TILE;
export const WORLD_H = ROWS * TILE;
export const VIEW_W = 720;
export const VIEW_H = 480;

const key = (x, y) => `${x},${y}`;
const solid = new Set();

function fillRect(x1, y1, x2, y2) {
    const xa = Math.max(0, x1);
    const xb = Math.min(COLS - 1, x2);
    const ya = Math.max(0, y1);
    const yb = Math.min(ROWS - 1, y2);
    for (let y = ya; y <= yb; y++) {
        for (let x = xa; x <= xb; x++) {
            solid.add(key(x, y));
        }
    }
}

export function isSolid(x, y) {
    if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return true;
    return solid.has(key(x, y));
}

// Colliders de entidades (AABB en px de mundo).
export const COLLIDERS = [];
function addCollider(x, y, w, h) {
    COLLIDERS.push({ x, y, w, h });
}

// Altura del collider segun los pies del sprite (borde superior = tile).
const FOOT_1_TILE = 40;    // arboles y NPCs
const FOOT_STAND = 126;   // stand 68x44 -> 272x176, top en y-50
const FOOT_FOUNTAIN = 280; // fuente 80 -> 280, top en y

// Fronteras y lago (coordenadas 0-based, inclusivas).
fillRect(0, 0, 49, 2);    // lago superior
fillRect(0, 3, 2, 15);    // lago izquierdo
fillRect(46, 3, 49, 15);  // lago derecho
fillRect(0, 15, 0, 24);   // frontera izquierda
fillRect(49, 15, 49, 24); // frontera derecha
fillRect(0, 24, 49, 24);  // frontera inferior

// Arboles.
export const TREES = [
    [2, 20], [1, 18], [0, 20], [2, 16], [3, 18], [4, 16], [5, 18],
    [6, 16], [7, 18], [8, 16], [9, 18], [10, 16], [11, 18], [12, 16], [13, 18],
    [47, 20], [48, 18], [49, 20], [47, 16], [46, 18], [45, 16], [44, 18],
    [43, 16], [42, 18], [41, 16], [40, 18], [39, 16], [38, 18], [37, 16], [36, 18],
    [7, 7], [8, 7], [9, 7], [10, 7],
    [7, 12], [8, 12], [9, 12], [10, 12],
];
TREES.forEach(([x, y]) => addCollider(x * TILE, y * TILE, TILE, FOOT_1_TILE));

// Stands de cada semana (4x2 celdas) con sus celdas de interaccion al frente.
export const STANDS = [
    { id: 'stand_1', semana: 'Semana_1', tile: [32, 12], link: 'Semana_1/index.html' },
    { id: 'stand_2', semana: 'Semana_2', tile: [37, 12], link: 'Semana_2/index.html' },
    { id: 'stand_3', semana: 'Semana_3', tile: [42, 12], link: 'Semana_3/index.html' },
    { id: 'stand_4', semana: 'Semana_4', tile: [18, 12], link: 'Semana_4/index.html' },
    { id: 'stand_5', semana: 'Semana_5', tile: [13, 12], link: 'Semana_5/index.html' },
    { id: 'stand_6', semana: 'Semana_6', tile: [13, 4], link: 'Semana_6/index.html' },
    { id: 'stand_7', semana: 'Semana_7', tile: [7, 4], link: 'Semana_7/index.html' },
    { id: 'stand_8', semana: 'Semana_8', tile: [37, 4], link: 'Semana_8/index.html' },
    { id: 'stand_9', semana: 'Semana_9', tile: [42, 4], link: 'Semana_9/index.html' },
];
STANDS.forEach((s) => {
    const [x, y] = s.tile;
    s.events = [[x + 1, y + 1], [x + 2, y + 1]];
    addCollider(x * TILE, y * TILE, 4 * TILE, FOOT_STAND);
});

// NPCs.
export const NPCS = [
    { id: 'juan', img: 'npc_juan', avatar: 'avatar_juan', dialog: 'juan', faction: 'estudiante', tile: [32, 4] },
    { id: 'julian', img: 'npc_julian', avatar: 'avatar_julian', dialog: 'julian', faction: 'estudiante', tile: [24, 9] },
    { id: 'sofia', img: 'npc_sofia', avatar: 'avatar_sofia', dialog: 'sofia', faction: 'estudiante', tile: [30, 15] },
];
NPCS.forEach((n) => addCollider(n.tile[0] * TILE, n.tile[1] * TILE, TILE, FOOT_1_TILE));

// Fuente.
export const FOUNTAIN = { tile: [25, 8] };
addCollider(FOUNTAIN.tile[0] * TILE, FOUNTAIN.tile[1] * TILE, 4 * TILE, FOOT_FOUNTAIN);

export const PLAYER_SPAWN = { x: 27 * TILE + TILE / 2, y: 16 * TILE + TILE / 2 };
