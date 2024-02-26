import pygame
import sys
import cuadricula
import math

#Definicion de variables
azul = (0,0,150);
negro = (0,0,0);
cord = []

width = 600;
height = 400;
res=(width,height);
dx = 5;

#Menu de Usuario
while True:
    print("|- - - Dibujar un Circulo - - -|");
    print("Grafique un Circulo en un plano cartesiano");
    print(f"Dominio de valores en x: desde -{math.floor(width/(dx*2))} hasta {math.floor(width/(dx*2))}");
    print(f"Dominio de valores en y: desde -{math.floor(height/(dx*2))} hasta {math.floor(height/(dx*2))}");

    print("\nCentro del circulo")
    h = int(input("Ingrese la Coordenada x:  "))    
    k = int(input("Ingrese la Coordenada y:  "))
    r = int(input("Ingrese el radio:  "))

    if(h>60 or h<-60):
        print(f"\nError: valor de x({h}) fuera de rango\n\n");
    elif(k>60 or k<-60):
        print(f"\nError: valor de y({k}) fuera de rango\n\n");
    elif(r>40 or r<-40):
            print(f"\nError: valor del radio({r}) fuera de rango\n\n");
    else:
        break;

#Genera del circulo
vector = [r*dx,0];
a = 1; #Valor de la distancia de rotación a la que rotará el vector para dibujar el círculo

for i in range(360):
    rotar = [round((vector[0]*math.cos(math.radians(a)))-(vector[1]*math.sin(math.radians(a))),3),
            round((vector[0]*math.sin(math.radians(a)))+(vector[1]*math.cos(math.radians(a))),3)]; #Rotación hecha mediante una matriz de rotcación
    cord.append(rotar);
    vector = rotar

#Desplazar el Circulo
for i in range(360):
    cord[i][0] = cord[i][0] + h*dx;
    cord[i][1] = cord[i][1] - k*dx;

#PYGAME
pygame.init();
pygame.display.set_caption('Dibujar un Circulo');
screen = pygame.display.set_mode(res);
cuadr = cuadricula.cuadricula(screen,negro,height,width,dx);

while True:
    for e in pygame.event.get():
        if(e.type == pygame.QUIT):
            sys.exit();
    
    screen.fill((255,255,255));
    cuadr.draw();

    #Circulo
    pygame.draw.circle(screen,azul,(h*dx+(width/2),(height/2)-k*dx),5); #Centro del Circulo

    for i in range(len(cord)-1):
        pygame.draw.rect(screen,azul,[cord[i][0]+(width/2),(height/2)+cord[i][1],2,2]);

    pygame.display.flip();