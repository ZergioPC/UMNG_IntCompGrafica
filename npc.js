import { TILE } from './level.js';
import { Sprite } from './sprite.js';

// Direccion -> columna del spritesheet del NPC (una sola fila).
const FACE_FRAME = { norte: 0, este: 1, oeste: 2, sur: 3 };

export class NPC {
    constructor({ img, dialog, avatar, faction, tile }) {
        this.sprite = new Sprite(img, 26, 26, 4, 1);
        this.dialog = dialog;
        this.avatar = avatar;
        this.faction = faction;
        this.tileX = tile[0];
        this.tileY = tile[1];
        this.px = tile[0] * TILE;
        this.py = tile[1] * TILE;
        this.face('norte');
    }

    face(dir) {
        this.facing = dir;
        this.sprite.frame = FACE_FRAME[dir] ?? 0;
    }

    resetFacing() {
        this.face('norte');
    }

    get baseY() { return this.py + 40; }

    draw(ctx, camX, camY) {
        const sx = this.px - camX;
        const sy = this.py - camY - 40;
        ctx.fillStyle = '#0000003e';
        ctx.fillRect(sx + 80 * 0.2, sy + 80 * 0.83, 80 * 0.6, 80 * 0.1);
        ctx.fillRect(sx + 80 * 0.25, sy + 80 * 0.83, 80 * 0.5, 80 * 0.15);
        this.sprite.draw(ctx, sx, sy, 80, 80);
    }
}
