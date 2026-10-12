import { TILE, PLAYER_SPAWN, isSolid } from './level.js';
import { Sprite } from './sprite.js';
import { isDown } from './input.js';

// Direccion -> vector de la celda al frente y fila del spritesheet del jugador.
export const FACING = {
    sur:   { x: 0,  y: 1,  row: 0 },
    oeste: { x: -1, y: 0,  row: 1 },
    este:  { x: 1,  y: 0,  row: 2 },
    norte: { x: 0,  y: -1, row: 3 },
};

const HALF = 24;          // semiancho de la hitbox (px)
const WALK_SPEED = 8;     // px/tick
const RUN_SPEED = 16;     // px/tick

export class Player {
    constructor(walkImg, runImg) {
        this.walkSprite = new Sprite(walkImg, 26, 26, 4, 4);
        this.runSprite = new Sprite(runImg, 26, 26, 4, 4);
        this.sprite = this.walkSprite;
        this.px = PLAYER_SPAWN.x;
        this.py = PLAYER_SPAWN.y;
        this.dir = 'sur';
        this.moving = false;
        this.sprite.row = FACING[this.dir].row;
    }

    get tileX() { return Math.floor(this.px / TILE); }
    get tileY() { return Math.floor(this.py / TILE); }
    get baseY() { return this.py + 40; }
    get frontTile() {
        const f = FACING[this.dir];
        return { x: this.tileX + f.x, y: this.tileY + f.y };
    }

    setRunning(on) {
        const next = on ? this.runSprite : this.walkSprite;
        if (next === this.sprite) return;
        next.frame = this.sprite.frame;
        next.row = this.sprite.row;
        this.sprite = next;
    }

    setIdle() {
        this.moving = false;
        this.sprite.frame = 0;
    }

    collides(cx, cy) {
        const x1 = Math.floor((cx - HALF) / TILE);
        const x2 = Math.floor((cx + HALF) / TILE);
        const y1 = Math.floor((cy - HALF) / TILE);
        const y2 = Math.floor((cy + HALF) / TILE);
        for (let ty = y1; ty <= y2; ty++) {
            for (let tx = x1; tx <= x2; tx++) {
                if (isSolid(tx, ty)) return true;
            }
        }
        return false;
    }

    // Deslizamiento por eje: se prueba X y luego Y de forma independiente.
    moveAxis(dx, dy) {
        if (dx !== 0 && !this.collides(this.px + dx, this.py)) this.px += dx;
        if (dy !== 0 && !this.collides(this.px, this.py + dy)) this.py += dy;
    }

    update() {
        let dx = 0;
        let dy = 0;
        if (isDown('KeyW')) dy -= 1;
        if (isDown('KeyS')) dy += 1;
        if (isDown('KeyA')) dx -= 1;
        if (isDown('KeyD')) dx += 1;

        const running = isDown('ShiftLeft');
        this.setRunning(running);

        dx = Math.sign(dx);
        dy = Math.sign(dy);

        if (dx === 0 && dy === 0) {
            this.setIdle();
            return;
        }

        this.moving = true;
        if (dy < 0) this.dir = 'norte';
        else if (dy > 0) this.dir = 'sur';
        else if (dx > 0) this.dir = 'este';
        else this.dir = 'oeste';
        this.sprite.row = FACING[this.dir].row;

        const speed = running ? RUN_SPEED : WALK_SPEED;
        const len = Math.hypot(dx, dy) || 1;
        this.moveAxis((dx / len) * speed, (dy / len) * speed);
    }

    draw(ctx, camX, camY) {
        const sx = this.px - camX - 40;
        const sy = this.py - camY - 40;
        ctx.fillStyle = '#0000003e';
        ctx.fillRect(sx + 24, sy + 64, 32, 16);
        ctx.fillRect(sx + 20, sy + 64, 40, 12);
        this.sprite.draw(ctx, sx, sy, 80, 80);
    }
}
