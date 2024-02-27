import pygame,math

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

        for i in range(math.floor(self.height/2),math.floor(self.height),(self.a)): #Lineas en Y-
            pygame.draw.line(self.pantalla,self.color,[0,(i)],[self.width,(i)],1);
        
        for i in range(math.floor(self.height/2),0,-(self.a)): #Lineas en Y+
            pygame.draw.line(self.pantalla,self.color,[0,(i)],[self.width,(i)],1);

        for i in range(math.floor(self.width/2),0,-(self.a)): #Lineas en X-
            pygame.draw.line(self.pantalla,self.color,[(i),0],[(i),self.height],1);

        for i in range(math.floor(self.width/2),math.floor(self.width),(self.a)): #Lineas en X+
            pygame.draw.line(self.pantalla,self.color,[(i),0],[(i),self.height],1);
            