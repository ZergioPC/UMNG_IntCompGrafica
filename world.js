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
            this.sizeX,this.sizeY      //Escala de la Imagen
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
    constructor(ctx,src,escala,pos,dialogo,avatar){
        //Datos
        this.dialogo = dialogo;
        
        //Canvas
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = src;
        this.avatar = new Image();
        this.avatar.src = avatar;

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
        for(let i=0; i<1 ; i++){
            for(let j=0; j<1 ; j++){
                this.actZone.push([j+this.pos[0],i+this.pos[1]]);
            }
        }
    }

    draw(cordX,cordY){
        this.ctx.fillStyle = "#0000003e";
        this.ctx.fillRect(
            this.x - cordX + (this.escala*0.2)
            ,this.y - cordY - 40 + (this.escala*0.83),
            (this.escala*0.6),(this.escala*0.1)
        );

        this.ctx.fillRect(
            this.x - cordX + (this.escala*0.25)
            ,this.y - cordY - 40 + (this.escala*0.83),
            (this.escala*0.5),(this.escala*0.15)
        );
        
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

class dialogo{
    constructor(ctx,src,avatar,keys){
        //canvas
        this.ctx = ctx;

        this.display = false;

        //Letrero
        this.img = new Image();
        this.img.src = src;
        this.avatar = new Image();
        this.avatar.src = avatar;
        this.keyImg = new Image();
        this.keyImg.src = keys;

        //Texto
        this.texto = {};
        this.line = 0;
        this.ready = false;
    }

    draw(){
        if(this.display == true){
            //Opacity
            this.ctx.fillRect(0,0,720,480); 
            //Avatar
            if(this.avatar.src != ''){
                this.ctx.drawImage(this.avatar,500,220,26*5,26*5);    
            }
            //Bg
            this.ctx.drawImage(this.img,60,300,600,180);
            //Name
            this.ctx.font = 'bold 30px Courier';
            this.ctx.fillStyle = "#4a111b";
            this.ctx.fillText(this.texto.name,100,395);
            //Txt 1
            this.ctx.font = '24px Courier';
            this.ctx.fillStyle = "#000000";
            this.ctx.fillText(this.texto.talk[this.line][0],100,425);
            this.ctx.fillText(this.texto.talk[this.line][1],100,449);
            //Key
            if(this.ready){
                this.ctx.drawImage(this.keyImg,0,0,35,12,620,450,80,26);
            }
        }
    }

    nextLine(){
        if(this.line == this.texto.talk.length-1){
            this.line = 0;
            this.display = false;
            return false;
        }else{
            this.line++;
            return true;
        }
    }
}

class alert {
    constructor(ctx,src,keys){
        //canvas
        this.ctx = ctx;
        this.display = false;

        //Letrero
        this.img = new Image();
        this.img.src = src;
        this.keysImg = new Image();
        this.keysImg.src = keys;

        //Texto
        this.texto = '';
        this.semana = '';
        this.enlace;
    }

    draw(){
        if(this.display == true){
            //Opacity
            this.ctx.fillRect(0,0,720,480); 
            //Bg
            this.ctx.drawImage(this.img,110,100,500,250);
            //Txt 1
            this.ctx.font = 'bold 30px Courier';
            this.ctx.fillStyle = "#000000";
            this.ctx.fillText(`¿Quieres visitar la `,190,200);
            this.ctx.fillText(`${this.semana}?`,290,240);
            //keys
            this.ctx.drawImage(this.keysImg,0,0,35,12,230,270,120,40);
            this.ctx.drawImage(this.keysImg,35,0,21,12,430,270,60,40);
        }
    }
}

export {mapa,player,npc,dialogo,alert};