// Clase Sprite generica: hoja de sprites de filas x columnas.
// frame = columna actual, row = fila actual.

export class Sprite {
    constructor(img, cellW, cellH, cols = 1, rows = 1) {
        this.img = img;
        this.cellW = cellW;
        this.cellH = cellH;
        this.cols = cols;
        this.rows = rows;
        this.frame = 0;
        this.row = 0;
    }

    advance() {
        this.frame = (this.frame + 1) % this.cols;
    }

    draw(ctx, x, y, w, h) {
        ctx.drawImage(
            this.img,
            this.frame * this.cellW,
            this.row * this.cellH,
            this.cellW,
            this.cellH,
            x, y, w, h
        );
    }
}
