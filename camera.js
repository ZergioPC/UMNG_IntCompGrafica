import { VIEW_W, VIEW_H, WORLD_W, WORLD_H } from './level.js';

// Camara centrada en el jugador con clamp a los bordes del mundo.
export function updateCamera(camera, player) {
    camera.x = clamp(player.px - VIEW_W / 2, 0, WORLD_W - VIEW_W);
    camera.y = clamp(player.py - VIEW_H / 2, 0, WORLD_H - VIEW_H);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
