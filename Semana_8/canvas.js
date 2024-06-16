class statico{
    constructor(ctx,img,x,y,w,h){      
        //coordenadas
        this.x = x;
        this.y = y;
        this.sx = w;
        this.sy = h;

        //Dibujado
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = img;

        this.delta = 0;
    }

    draw(){
        this.ctx.drawImage(
            this.img,
            this.x,this.y+this.delta,       //Posición
            this.sx,this.sy,                //Escala del dibujado
        )
    }

    rayo(){
        for (let i = 0; i < 7; i++) {
            const aux = ((-1)**i)+1;
            setTimeout(()=>{
                this.delta = 9999 * aux;
            },(i*100));
        }
    }
}

class animado extends statico{
    constructor(ctx,img,x,y,w,h,xf,yf,rx,ry){
        super(ctx,img,x,y,w,h);

        //Recorte
        this.rx = rx;
        this.ry = ry;

        //Animacion
        this.xf = xf;
        this.yf = yf;
        this.frameX = 0;
        this.frameY = 0;
    }

    animar(){
        this.ctx.drawImage(
            this.img,
            this.frameX*this.rx,        //Frame en X   
            this.frameY*this.ry,        //Frame en Y
            this.rx,this.ry,            //Escala del recorte
            this.x,this.y,   //Posición
            this.sx,this.sy,            //Escala del dibujado
        )
    }

    frame(){
        if(this.frameX == this.xf){
            this.frameX = 0;
        }else{
            this.frameX++;
        }
        
        if(this.frameY == this.yf){
            this.frameY = 0;
        }else{
            this.frameY++;
        }
    }
}

class boton{
    constructor(ctx,x,y,w,h,txt){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.txt = txt;

        //colores
        this.bg = '#1e262e';
        this.color = "#ffffff";
    }

    draw(){
        this.ctx.fillStyle = this.bg;
        this.ctx.fillRect(this.x,this.y,this.w,this.h);
        this.ctx.fillStyle = this.color;
        this.ctx.font = `${this.h-5}px Courier`;
        this.ctx.fillText(this.txt,this.x+55,this.y+this.h-10);
    }

    hover(x,y){
        if(
            x >= (this.x - 10) && x <= (this.x)+(this.w + 10) &&
            y >= (this.y - 10) && y <= (this.y)+(this.h + 10)
        ){  
            return true;
        }else{
            return false;
        }
    }
}
export {statico,animado,boton};