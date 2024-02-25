import pygame
import sys
import cuadricula
import math

#Definicion de variables
azul = (0,0,150);
negro = (0,0,0);
cord = []

width = 600;
heigth = 400;
res=(width,heigth);
dx = 5;

#Calculos del circulo
h = 0;
k = 0;
r = 10;

for i in range(r*10):
    x = (i-h)*10;

    y = math.sqrt(abs(r**2 - (x-h)**2))+k
    
    cord.append([x,y,-y]);
    cord.append([-x,y,-y]);
    #print(f"x:{x} y:{y} i:{i}")

#PYGAME
pygame.init();
pygame.display.set_caption('Dibujar un Circulo');
screen = pygame.display.set_mode(res);
cuadr = cuadricula.cuadricula(screen,negro,heigth,width,dx);

""" for i in range(rango):
    print(f"x:{cord[i][0]+(width/2)} y:{(heigth/2)-cord[i][1]}");
    print(f"x:{cord[i][0]+(width/2)} y:{(heigth/2)-cord[i][2]}"); """


while True:
    for e in pygame.event.get():
        if(e.type == pygame.QUIT):
            sys.exit();
    
    screen.fill((255,255,255));
    cuadr.draw();

    #Circulo
    for i in range(len(cord)-1):
        pygame.draw.rect(screen,azul,[cord[i][0]+(width/2),(heigth/2)+cord[i][1],2,2]);
        pygame.draw.rect(screen,azul,[cord[i][0]+(width/2),(heigth/2)+cord[i][2],2,2]);

    pygame.display.flip();