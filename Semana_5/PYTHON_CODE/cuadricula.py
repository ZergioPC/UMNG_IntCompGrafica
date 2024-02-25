import pygame

class cuadricula:
    def __init__(self,pantalla,color,height,width,a):
        self.pantalla = pantalla;
        self.color = color;
        self.height = height;
        self.width = width;
        self.a = a*10

    def draw(self):
        pygame.draw.line(self.pantalla,self.color,[0,(self.height/2)],[self.width,(self.height/2)],3);
        pygame.draw.line(self.pantalla,self.color,[(self.width/2),0],[(self.width/2),self.height],3);

        for i in range(10):
            pygame.draw.line(self.pantalla,self.color,[0,(i*self.a)],[self.width,(i*self.a)],1);
            
        for i in range(14):
            pygame.draw.line(self.pantalla,self.color,[(i*self.a-1),0],[(i*self.a-1),self.height],1);