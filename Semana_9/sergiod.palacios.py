import pygame,sys,math

#Variables iniciales
width = 640;
height = 360;

centro = [width/2,height/2]
dx = 5; #Unidad minima de medida
apo = 30;    

showLines = 0


while True:
    print("|- - - Dibujar Estrella - - -|");
    print("Graficar una estrella de n lados");
    n = math.floor(abs(int(input("Ingrese numero de Lados(min 3):  "))));
    L = math.floor(abs(int(input("Ingrese longitud del Lado(max 20):  ")))*dx);
    altura = math.floor(abs(int(input("Ingrese altura de las puntas (max 5):  "))));

    print("Desea ver las lineas del poligono interior?")
    showLines = math.floor(abs(int(input(" 1. si  2. no \n"))));
    
    if (n < 3):
        print("\nError: Numero de lados insuficiente\n\n");
    elif (L > 20*dx):
        print("\nError: Tamaño de lado máximo superado\n\n");
    elif (altura > 5):
        print("\nError: Altura de la punta máximo superado\n\n");
    elif (showLines > 2 or showLines < 1):
        print("\nError: Opcion de ver lineas no valida\n\n");
    else:
        break;

#Calculos del POLígono

vertexTotal = [];   #Arreglo con las coordenadas de los vertices de la figura
vertexPuntas = [];  #Arreglo con  las coordenadas de las puntas


def matrixRotar(vector,a):
    vector = [round((vector[0]*math.cos(math.radians(a)))-(vector[1]*math.sin(math.radians(a))),3),
            round((vector[0]*math.sin(math.radians(a)))+(vector[1]*math.cos(math.radians(a))),3)]; #Matriz de rotación
    return vector;

#Calculos de las puntas

def drawPuntas(matrx,alto):
    for i in range(len(matrx)):
        #Identificamos los puntos de los lados
        a = matrx [i];
        if(i+1 >= n):
            b = matrx[0];
        else:
            b = matrx[i+1];
        
        c =[(a[0]+b[0])/2,(a[1]+b[1])/2]
        
        c = [c[0]*alto,c[1]*alto]

        vertexPuntas.append(c);

def centrar(fig,puntas):
    for i in range(len(fig)): #Centrar la figura
        fig[i][0] = centro[0] + fig[i][0];
        fig[i][1] = centro[1] - fig[i][1];
    
    for i in range(len(puntas)): #Centrar laspuntas
        puntas[i][0] = centro[0] + puntas[i][0];
        puntas[i][1] = centro[1] - puntas[i][1];


#FUNCIÓN ESTRELLA

""" 
ARGUMENTO 1: matriz para almacenar las coordenadas de los vertices del poligono interno de la estrella
ARGUMENTO 2: matriz para almacenar las coordenadas de las puntas de la estrella 
ARGUMENTO 3: Numero de lados del poligono de la estrella
ARGUMENTO 4: Longitud del lado del poligono de la estrella
ARGUMENTO 5: Altura de las puntas
"""

def estrella(matrixPoligon,matrixPuntas,nLados,long,hPunta):

    h = math.sqrt(apo**2+(long/2)**2); #Hipotenusa
    angulo =(360/(nLados));  #AnLadosgulo de rotación entre cada vertice

    for i in range(nLados): #Rotar el radio para obtener los vertices del poligono
        matrixPoligon.append(matrixRotar([h,0],angulo*i));

    drawPuntas(matrixPoligon,hPunta);
    centrar(matrixPoligon,matrixPuntas);


estrella(vertexTotal,vertexPuntas,n,L,altura);

#COLORES
ROJO = (100,0,0)
AZUL = (0,0,100)

#Declaraciones para Pygame
pygame.init();

pygame.display.set_caption("Parcial Practico - Corte 1");
display = pygame.display.set_mode((width,height));

""""""
while True:
    for e in pygame.event.get():
        if(e.type == pygame.QUIT):
            sys.exit();

    display.fill((255,255,255));

    pygame.draw.circle(display,(255,0,0),(centro),5);
    
    for i in range(len(vertexTotal)):
        pygame.draw.circle(display,ROJO,(vertexTotal[i][0],vertexTotal[i][1]),5); #Puntos del Poligono

    for i in range(len(vertexPuntas)):
        pygame.draw.circle(display,AZUL,(vertexPuntas[i][0],vertexPuntas[i][1]),5); #Puntos de las puntas

    if(showLines == 1): # Lineas deL POLIGONO
        for i in range(n): 
            p1 = vertexTotal[i];
            if (i+1 >= n):
                p2 = vertexTotal[0];
            else:
                p2 =vertexTotal[i+1];        
            pygame.draw.line(display,ROJO,p1,p2,2);

    for i in range(n): # Lineas de las puntas
        p1 = vertexTotal[i];
        p3 = vertexPuntas[i];
        
        if (i+1 >= n):
            p2 = vertexTotal[0];
        else:
            p2 =vertexTotal[i+1];        

        pygame.draw.line(display,AZUL,p1,p3,2);
        pygame.draw.line(display,AZUL,p2,p3,2);

    pygame.display.flip();

""""""