import pygame
import sys
import cuadricula
import math

#Definicion de variables
rojo = (150,0,0);
negro = (0,0,0);
arr = []

width = 600;
height = 400;
dx = 5; #Distancia por la que se separarán visualmente las casillas. Considerando que el espacio entre lineas será 10

#Get Coordenadas;
while True:
    print("|- - - Dibujar una Linea - - -|");
    print("Grafique una linea en un plano cartesiano");
    print(f"Dominio de valores en x: desde -{math.floor(width/(dx*2))} hasta {math.floor(width/(dx*2))}");
    print(f"Dominio de valores en y: desde -{math.floor(height/(dx*2))} hasta {math.floor(height/(dx*2))}");

    x1 = int(input("Ingrese la Coordenada x1:  "))        
    y1 = int(input("Ingrese la Coordenada y1:  "))
    x2 = int(input("Ingrese la Coordenada x2:  "))
    y2 = int(input("Ingrese la Coordenada y2:  "))

    if(x1>60 or x1<-60):
        print(f"\nError: valor de x1({x1}) fuera de rango\n\n");
    elif(x2>60 or x2<-60):
        print(f"\nError: valor de x2({x2}) fuera de rango\n\n");
    elif(y1>40 or y1<-40):
            print(f"\nError: valor de y1({y1}) fuera de rango\n\n");
    elif(y2>40 or y2<-40):
            print(f"\nError: valor de y2({y2}) fuera de rango\n\n");
    else:
        break;

#Calculos de la recta
"""
    Los calculos se realizaran mediante la ecuación de la recta y=mx+b
"""

d = 0.0000001 #Diferencial para que al sacar la pendiente no de un numero indeterminado

m =round(((y2-y1)/(x2-x1+d)),3); #Pendiente redondeada para eliminar el diferencial
b = y1*dx-(m*x1)*dx;

rango = abs(x2-x1);

for i in range(rango): #En caso de que el punto (x2,y2) se encuentre detras del punto (x1,y1)
    if(x2 > x1):
        x = (x1+i)*dx 
    else:
        x = (x2+i)*dx

    y = (m*x)+b
    arr.append([x,y])

# PYGAME #
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
    
    pygame.draw.circle(pantalla,rojo,[((x1*dx)+(width/2)),((height/2)-(y1*dx))],5); #Punto (x1,y1)
    pygame.draw.circle(pantalla,rojo,[((x2*dx)+(width/2)),((height/2)-(y2*dx))],5); #Punto (x2,y2)

    pygame.display.flip();