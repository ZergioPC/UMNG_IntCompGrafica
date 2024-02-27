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
azul = (0,0,150);

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
xSol = 18;
ySol = 21;

for i in range(360):
    rotar = [round((vector[0]*math.cos(math.radians(a)))-(vector[1]*math.sin(math.radians(a))),3),
            round((vector[0]*math.sin(math.radians(a)))+(vector[1]*math.cos(math.radians(a))),3)]; #Rotación hecha mediante una matriz de rotcación
    sol.append(rotar);
    vector = rotar

#Desplazar el Circulo
for i in range(360):
    sol[i][0] = sol[i][0] + xSol*dx;
    sol[i][1] = sol[i][1] - ySol*dx;

#Dibujar Rio
""" Mediante una transformación lineal, inclinaremos la función sin() """

rio = [] #Declaramos el arreglo
ux = [1,0]; #Vector base en dirección x
uy = [0.7,0.5];  #Vector bas en dirección y

for x in range(180): #Coordenadas de la función sin()
    y = math.sin(math.radians(x*4))*20;
    rio.append([x,y]);

for i in range(len(rio)): #Aplicamos transformación lineal
    rio[i] = [rio[i][0]*ux[0] + rio[i][1]*uy[0],
            rio[i][0]*ux[1] + rio[i][1]*uy[1]]

th = -20; #Angulo de inclinación

for i in range(len(rio)): #Rotamos un poco la funcion en el plano mediante una matriz de rotación
    rio[i] = [round((rio[i][0]*math.cos(math.radians(th)))-(rio[i][1]*math.sin(math.radians(th))),3),
            round((rio[i][0]*math.sin(math.radians(th)))+(rio[i][1]*math.cos(math.radians(th))),3)];

xRio = 20;  #Desplazamiento en x
yRio = 120;  #Desplazamiento en y

for i in range(len(rio)): #Desplazamos el rio
    rio[i] = [rio[i][0] + xRio, rio[i][1] + yRio];

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
    
    for i in range(len(climb)): #Diujar Montañas
        pygame.draw.rect(display,verde,dibujar(climb,i,-110,80));
        pygame.draw.rect(display,verde,dibujar(climb,i,-50,10));
        pygame.draw.rect(display,verde,dibujar(climb,i,10,50));

    for i in range(len(sol)): #Dibujar Sol
        pygame.draw.rect(display,amarillo,[sol[i][0]+(width/2),(heigth/2)+sol[i][1],2,2]);

    for i in range(len(rio)): #Dibujar rio
        pygame.draw.rect(display,azul,[rio[i][0]+(width/2),(heigth/2)+rio[i][1],2,2]);
        pygame.draw.rect(display,azul,[rio[i][0]+(width/2)+4,(heigth/2)+rio[i][1],2,2]);
        pygame.draw.rect(display,azul,[rio[i][0]+(width/2)+8,(heigth/2)+rio[i][1],2,2]);
        pygame.draw.rect(display,azul,[rio[i][0]+(width/2)+12,(heigth/2)+rio[i][1],2,2]);

    pygame.display.flip();