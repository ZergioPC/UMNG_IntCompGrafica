class mapa {
    constructor(ctx,renderX,renderY,sizeX,sizeY,src){
        //canvas
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = src;

        //Posicion
        this.renderX = renderX;
        this.renderY = renderY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.frame = 0;
    }

    draw(x,y){
        this.ctx.drawImage(
            this.img, //Imagen
            x/10,
            y/10+(200*this.frame),  //Desfasado
            this.renderX,this.renderY,      //Escalar
            0,0,    //Posición inicial
            this.sizeX,this.sizeY,      //Escala de la Imagen
        );
    }
}

class player{
    constructor(ctx,walk,run,escala,lienzo){
        //CTX
        this.ctx = ctx;
        this.size = 26;
        this.lienzo = lienzo;
        
        //Assets
        this.walkSp = new Image();
        this.walkSp.src = walk;
        this.runSp = new Image();
        this.runSp.src = run;
        
        this.img = this.walkSp;

        /* Animaciones */
        this.frame = 0;     //26
        this.animation = 0; //26

        this.escala = escala;
    }

    drawCtx(xPos,yPos){
        this.ctx.fillStyle = "#0000003e";
        this.ctx.fillRect(
            xPos+((this.lienzo.ancho/2)-(this.escala/2))+(this.escala*0.3),
            yPos+((this.lienzo.alto/2)-(this.escala/2))+(this.escala*0.8),
            (this.escala*0.4),(this.escala*0.2)
        );

        this.ctx.fillRect(
            xPos+((this.lienzo.ancho/2)-(this.escala/2))+(this.escala*0.25),
            yPos+((this.lienzo.alto/2)-(this.escala/2))+(this.escala*0.8),
            (this.escala*0.5),(this.escala*0.15)
        );
        
/*         
        //Hitbox
        this.ctx.fillRect(
            xPos + ((this.lienzo.ancho/2)-(this.escala/2)),
            yPos + ((this.lienzo.alto/2)-(this.escala/2)),
            this.escala,this.escala
        );
*/

        this.ctx.drawImage(
            this.img, //Imagen
            this.frame*26, 
            this.animation*26,
            this.size,this.size,
            xPos + ((this.lienzo.ancho/2)-(this.escala/2)),
            yPos + ((this.lienzo.alto/2)-(this.escala/2)),
            this.escala,this.escala
        );
    }
}

class npc{
    constructor(ctx,src,escala,pos,dialogo){
        //Datos
        this.dialogo = dialogo;
        
        //Canvas
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = src;

        //posicion y animación
        this.pos = pos;
        this.x,this.y;
        this.frame = 0;        
        this.size = 26;
        this.escala = escala;

        //Coilisiones
        this.zona = []
        for(let i=0; i<1 ; i++){
            for(let j=0; j<1 ; j++){
                this.zona.push([j+this.pos[0],i+this.pos[1]]);
            }
        }

        //Interacciones
        this.actZone = [];
        for(let i=0; i<3 ; i++){
            for(let j=0; j<3 ; j++){
                this.actZone.push([j+this.pos[0],i+this.pos[1]]);
            }
        }
    }

    draw(cordX,cordY){
        /*         
        //Hitbox
        this.ctx.fillRect(
            this.x - cordX,
            this.y - cordY - 40,
            this.escala,this.escala
        ); 
        */
        
        this.ctx.drawImage(
            this.img,
            this.frame*this.size,0,
            this.size,this.size, //Tamaño del personaje
            this.x - cordX ,this.y - cordY - 40, //Posición
            this.escala,this.escala //Tamaño en el canvas
        );
    }
}

export {mapa,player,npc};