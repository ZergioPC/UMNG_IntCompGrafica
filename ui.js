import { VIEW_W, VIEW_H } from './level.js';

const OVERLAY = 'rgba(0,0,0,0.55)';
const READY_GATE = 120;

export class DialogueBox {
    constructor(imgs) {
        this.imgs = imgs;
        this.display = false;
        this.ready = false;
        this.line = 0;
        this.texto = null;
        this.avatar = null;
    }

    open(npc) {
        this.texto = npc.dialog;
        this.avatar = npc.avatar;
        this.line = 0;
        this.display = true;
        this.ready = false;
        setTimeout(() => { this.ready = true; }, READY_GATE);
    }

    next() {
        if (!this.ready) return true;
        if (this.line >= this.texto.talk.length - 1) {
            this.close();
            return false;
        }
        this.line++;
        this.ready = false;
        setTimeout(() => { this.ready = true; }, READY_GATE);
        return true;
    }

    close() {
        this.display = false;
        this.texto = null;
        this.avatar = null;
    }

    draw(ctx) {
        if (!this.display) return;

        ctx.fillStyle = OVERLAY;
        ctx.fillRect(0, 0, VIEW_W, VIEW_H);

        if (this.avatar) ctx.drawImage(this.avatar, 500, 220, 130, 130);
        ctx.drawImage(this.imgs.dialogue_box, 60, 300, 600, 180);

        ctx.font = 'bold 30px Courier';
        ctx.fillStyle = '#4a111b';
        ctx.fillText(this.texto.name, 100, 395);

        ctx.font = '24px Courier';
        ctx.fillStyle = '#000000';
        ctx.fillText(this.texto.talk[this.line][0], 100, 425);
        ctx.fillText(this.texto.talk[this.line][1], 100, 449);

        if (this.ready) {
            ctx.drawImage(this.imgs.action_keys, 0, 0, 35, 12, 620, 450, 80, 26);
        }
    }
}

export class AlertBox {
    constructor(imgs) {
        this.imgs = imgs;
        this.display = false;
        this.semana = '';
        this.stand = null;
    }

    open(stand) {
        this.stand = stand;
        this.semana = stand.semana;
        this.display = true;
    }

    confirm() {
        if (this.stand) window.location.href = this.stand.link;
    }

    close() {
        this.display = false;
        this.stand = null;
    }

    draw(ctx) {
        if (!this.display) return;

        ctx.fillStyle = OVERLAY;
        ctx.fillRect(0, 0, VIEW_W, VIEW_H);

        ctx.drawImage(this.imgs.alert_box, 110, 100, 500, 250);

        ctx.font = 'bold 30px Courier';
        ctx.fillStyle = '#000000';
        ctx.fillText('¿Quieres visitar la ', 190, 200);
        ctx.fillText(`${this.semana}?`, 290, 240);

        ctx.drawImage(this.imgs.action_keys, 0, 0, 35, 12, 230, 270, 120, 40);
        ctx.drawImage(this.imgs.action_keys, 35, 0, 21, 12, 430, 270, 60, 40);
    }
}
