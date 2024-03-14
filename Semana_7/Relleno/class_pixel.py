import pygame;

class pixel:
    #Constructor
    def __init__(self,up,dw,der,izq,coord,display):
        self.up = up;
        self.dw = dw;
        self.der = der;
        self.izq = izq;
        self.color = [0,0,0];
        self.coord = coord;
        self.display = display;


    #Metodos
    def draw(self):
        pygame.draw.rect(self.display,self.color,[self.coord[0]*2,self.coord[1]*2,1,1]);

    #Setters
    def setUp(self,up):
        self.up = up;

    def setDw(self,dw):
        self.dw = dw;
    
    def setIzq(self,izq):
        self.izq = izq;
    
    def setDer(self,der):
        self.der = der;

    def setColor(self,color):
        self.color = color;

    def setCoord(self,coord):
        self.coord = coord;