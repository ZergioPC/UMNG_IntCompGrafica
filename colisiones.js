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

class stand {
    constructor(ctx,x,y,semana,src){
        //Posicion
        this.origen = [x,y]
        this.x = 0;
        this.y = 0;
        this.escala = [68*4,44*4];
        
        //Asset
        this.ctx = ctx
        this.semana = semana;
        this.link = function(){
            location.href = `${semana}/index.html`;
        };
        this.img = new Image();
        this.img.src = src;

        //Colision
        this.zona =[];
        for(let i=0; i<2 ; i++){
            for(let j=0; j<4 ; j++){
                this.zona.push([j+this.origen[0],i+this.origen[1]]);
            }
        }

        //Accion
        this.evento = [
            [x+1,y+1],
            [x+2,y+1]
        ]
    }

    draw(xPos,yPos){
        this.ctx.drawImage(
            this.img,
            this.x - xPos  + 25,this.y - yPos - 50, //Posición
            this.escala[0],this.escala[1] //Tamaño en el canvas
        );
    }
}

class objeto {
    constructor(ctx,x,y,size,src){
        //Posicion
        this.x = 0;
        this.y = 0;
        this.origen = [x,y]

        //Asset
        this.ctx = ctx;
        this.img = new Image();
        this.img.src =  src;

        //escalado
        this.size = size;

        //Coilisiones
        this.zona = []
        for(let i=0; i<1 ; i++){
            for(let j=0; j<1 ; j++){
                this.zona.push([j+this.origen[0],i+this.origen[1]]);
            }
        }
    }

    draw(xPos,yPos,frame){
        /* 
        //Hitbox
        this.ctx.fillRect(
            this.x - xPos,
            this.y - yPos - 40,
            80,80
        ); 
         */
        this.ctx.drawImage(
            this.img, //Imagen
            this.size*frame, 0,  //Desfasado
            this.size,this.size,      //Escalar
            this.x - xPos - 12, this.y - yPos - 60,    //Posición inicial
            100,100      //Escala de la Imagen
        );
    }
}

class fuente extends objeto {
    constructor(ctx,x,y,size,render,src){
        super(ctx,x,y,size,src);
        this.render = render;
        this.zona = [];
        this.zona = []
        for(let i=0; i<4 ; i++){
            for(let j=0; j<4 ; j++){
                this.zona.push([j+this.origen[0],i+this.origen[1]]);
            }
        }
    }

    draw(xPos,yPos,frame){
        /* 
        //Hitbox
        this.ctx.fillRect(
            this.x - xPos,
            this.y - yPos - 40,
            80,80
        ); 
         */
        this.ctx.drawImage(
            this.img, //Imagen
            this.size*frame, 0,  //Desfasado
            this.size,this.size,      //Escalar
            this.x - xPos + 20, this.y - yPos,    //Posición inicial
            this.render,this.render      //Escala de la Imagen
        );
    }
}

export {edificio,stand,objeto,fuente};