import cuadricula
import math
import pygame
import sys

#Variables
width = 600;
heigth = 400;
dx = 5;

negro = (0,0,0);
verde = (0,150,0);
amarillo = (241,192,70);

#Dibujar montaña
climb = [];

for i in range(90):
    x = i
    y = -0.1*x**1.5
    climb.append([x,y]);
    climb.append([-x,y]);

#Dibujar sol
r = 10;
vector = [r*dx,0];
sol = []
a = 1; #Valor de la distancia de rotación a la que rotará el vector para dibujar el círculo
x = 18;
y = 21;

for i in range(360):
    rotar = [round((vector[0]*math.cos(math.radians(a)))-(vector[1]*math.sin(math.radians(a))),3),
            round((vector[0]*math.sin(math.radians(a)))+(vector[1]*math.cos(math.radians(a))),3)]; #Rotación hecha mediante una matriz de rotcación
    sol.append(rotar);
    vector = rotar

#Desplazar el Circulo
for i in range(360):
    sol[i][0] = sol[i][0] + x*dx;
    sol[i][1] = sol[i][1] - y*dx;

#Dibujar Rio

#PyGame
pygame.init();

pygame.display.set_caption("Dibujo")
display = pygame.display.set_mode((width,heigth))
cuadr = cuadricula.cuadricula(display,negro,heigth,width,dx);

def dibujar(arr,i,x,y):
    return (arr[i][0]+(width/2)+x,(heigth/2)-arr[i][1]-y,2,2)

while True:
    for e in pygame.event.get():
        if(e.type == pygame.QUIT):
            sys.exit();

    display.fill((255,255,255));
    cuadr.draw();
    
    """ for i in range(len(climb)): #Diujar Montañas
        pygame.draw.rect(display,verde,dibujar(climb,i,-110,80));
        pygame.draw.rect(display,verde,dibujar(climb,i,-50,10));
        pygame.draw.rect(display,verde,dibujar(climb,i,10,50));

    for i in range(len(sol)): #Dibujar Sol
        pygame.draw.rect(display,amarillo,[sol[i][0]+(width/2),(heigth/2)+sol[i][1],2,2]) """

    pygame.display.flip();