import pygame,sys,math,cuadricula

#VARIABLES DE LA PANTALLA
alto = 400;
largo = 600;

centro = [largo/2,alto/2]
dx = 5; #Unidad minima de medida

#USUARIO
print("|- - - Dibujar Poligono - - -|");
print("Grafique una Poligono en un plano cartesiano");

apo = int(input("Ingrese la apotema:  "))*dx       
L = int(input("Ingrese longitude del Lado:  "))*dx
nLados = int(input("Ingrese numero de Lados:  "))


#COLORES
negro = (0,0,0)
azul = (0,0,150)

#Calculos de la figura
h = math.sqrt(apo**2+(L/2)**2); #Hipotenusa


vertexTotal = [];   #Arreglo con las coordenadas de los vertices de la figura

angulo =(360/(nLados)); #Angulo de rotación entre cada vertice
print(angulo)

def matrixRotar(vector,a):
    vector = [round((vector[0]*math.cos(math.radians(a)))-(vector[1]*math.sin(math.radians(a))),3),
            round((vector[0]*math.sin(math.radians(a)))+(vector[1]*math.cos(math.radians(a))),3)]; #Matriz de rotación
    print(vector);
    return vector;


for i in range(nLados): 
    vertexTotal.append(matrixRotar([h,0],angulo*i));

for i in range(len(vertexTotal)):
    vertexTotal[i][0] = centro[0] + vertexTotal[i][0];
    vertexTotal[i][1] = centro[1] - vertexTotal[i][1];
    pass

#Declaraciones para Pygame
pygame.init();

pygame.display.set_caption("Parcial Practico - Corte 1");
display = pygame.display.set_mode((largo,alto));

cuad = cuadricula.cuadricula(display,negro,alto,largo,dx)

while True:
    for e in pygame.event.get():
        if(e.type == pygame.QUIT):
            sys.exit();

    display.fill((255,255,255));
    cuad.draw();

    pygame.draw.circle(display,(255,0,0),(centro),5);
    for i in range(len(vertexTotal)):
        pygame.draw.circle(display,azul,(vertexTotal[i][0],vertexTotal[i][1]),5);

    for i in range(nLados):
        p1 = vertexTotal[i];
        
        if (i+1 >= nLados):
            p2 = vertexTotal[0];
        else:
            p2 =vertexTotal[i+1];        

        pygame.draw.line(display,azul,p1,p2,2);

    pygame.display.flip();
        