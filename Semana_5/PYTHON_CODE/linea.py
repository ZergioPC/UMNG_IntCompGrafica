import pygame
import sys
import cuadricula

#Definicion de variables
rojo = (150,0,0);
negro = (0,0,0);
arr = []

#Get Coordenadas;
print("|- - - Dibujar una Linea - - -|");
x1 = int(input("Ingrese la Coordenada x1:  "))
y1 = int(input("Ingrese la Coordenada y1:  "))
x2 = int(input("Ingrese la Coordenada x2:  "))
y2 = int(input("Ingrese la Coordenada y2:  "))

#Calculos de la recta
d = 0.0000001
dx = 5;

m =round(((y2-y1)/(x2-x1+d)),3);
b = y1*dx-(m*x1)*dx;

rango = abs(x2-x1);

for i in range(rango):
    if(x2 > x1):
        x = (x1+i)*dx
    else:
        x = (x2+i)*dx

    y = (m*x)+b
    arr.append([x,y])

# PYGAME #
width = 600;
height = 400;

windowSize = [width,height];

pygame.init();
pygame.display.set_caption('Dibujar una Linea');

pantalla = pygame.display.set_mode(windowSize);

while True:
    for e in pygame.event.get():
        if(e.type == pygame.QUIT):
            sys.exit();
    
    pantalla.fill((255,255,255));
    
    #Cuadricula
    fondo = cuadricula.cuadricula(pantalla,negro,height,width,dx);
    fondo.draw();
    
    #Linea
    for i in range(rango):
        pygame.draw.rect(pantalla,rojo,[(arr[i][0]+(width/2)-1),((height/2)-(arr[i][1])),2,2]);
    
    pygame.draw.circle(pantalla,rojo,[((x1*dx)+(width/2)),((height/2)-(y1*dx))],5);
    pygame.draw.circle(pantalla,rojo,[((x2*dx)+(width/2)),((height/2)-(y2*dx))],5);

    pygame.display.flip();