import pygame,sys,math;
import class_pixel as pixel, class_extras as extra;

#Ajustes de la ventana de pygame
alto = 400;
largo = 600;

pygame.init();
pygame.display.set_caption("Relleno por Inundación");
display = pygame.display.set_mode((largo,alto));



#Definiendo Figura a Rellenar

dx = 5;
coordenadas = [[0,0],[100,0],[100,100],[0,100]];


#Definiendo la figura en un array
base =[]

for i in range(100):
    aux = [];
    for j in range(100):
        aux.append([j,i]);
    base.append(aux);

cuadrado = [];

for i in range(100):
    aux = [];
    for j in range(100):
        up = None;
        dw = None;
        izq = None;
        der = None;

        if(i-1 >= 0):
            up = base[j][i-1];

        if(i+1 <= 99):
            dw = base[j][i+1];
        
        if(j-1 >= 0):
            izq = base[j-1][i];
        
        if(j+1 <= 99):
            up = base[j+1][i];

        aux.append(pixel.pixel(up,dw,izq,der,[j,i],display));
    cuadrado.append(aux);


#Ejecución

while True:
    for e in pygame.event.get():
        if(e.type == pygame.QUIT):
            sys.exit();

    display.fill((255,255,255));

    for i in range(100):
        for j in range(100):
            cuadrado[j][i].draw();

    pygame.display.flip();