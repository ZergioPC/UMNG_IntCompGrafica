class edificio{
    constructor(x1,x2,y1,y2){
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        
        this.deltaX = this.x2-this.x1+1;
        this.deltaY = this.y2-this.y1+1;
        this.zona =[];

        for(let i=0; i<this.deltaY ; i++){
            for(let j=0; j<this.deltaX ; j++){
                this.zona.push([j+this.x1,i+this.y1]);
            }
        }
    }
}

class letrero extends edificio{
    constructor(x1,x2,y1,y2,dialogo){
        super(x1,x2,y1,y2);
        this.dialogo = [[[x1,y1],[x1,y2],[x2,y1],[x2,y2]],dialogo]; //[[zona],...,],[[txt]]
    }
}

export {edificio,letrero};