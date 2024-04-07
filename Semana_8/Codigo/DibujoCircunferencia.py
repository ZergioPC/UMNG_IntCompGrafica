import pygame,sys;

#Colores
RED = (100,0,0);
GREEN = (0,100,0);
BLUE = (0,0,100);
WHITE = (250,250,250);
BLACK = (0,0,0);
GRAY = (100,100,100);

# pygame setup

displace = [0,0];
radio = 0;
move = [10*displace[0],10*displace[1]];

display = [600,400];
space = 10;

#ALGORITMO
def draw_circle(radius):
    matrix = [[' ' for _ in range(20)] for _ in range(20)]  # Crear matriz de 20x20

    x = radius
    y = 0
    p = 1 - radius

    while x >= y:
        matrix[y + 10][x + 10] = 0  # Octante 1
        matrix[x + 10][y + 10] = 0  # Octante 2
        matrix[-y + 10][x + 10] = 0  # Octante 8
        matrix[-x + 10][y + 10] = 0  # Octante 7
        matrix[-y + 10][-x + 10] = 0  # Octante 6
        matrix[-x + 10][-y + 10] = 0  # Octante 5
        matrix[y + 10][-x + 10] = 0  # Octante 3
        matrix[x + 10][-y + 10] = 0  # Octante 4

        y += 1
        if p <= 0:
            p = p + 2 * y + 1
        else:
            x -= 1
            p = p + 2 * y - 2 * x + 1

    return matrix

#Función que recoje el centro y el radio:

def crearCirculo(x,y,r):
    global radio,displace,move;
    radio = r;
    
    displace[0] = x;
    displace[1] = y;
    move = [10*displace[0],10*displace[1]];


#Tomar Datos
while True:
    print("- - - Graficar Círculo - - -");
    auxX = int(input("Ingrese la Coordenada x (menor a 40):  "));
    auxY = int(input("Ingrese la Coordenada y (menor a 20):  "));
    auxR = int(input("Ingrese el Radio (menor a 9):  "));
    break;

crearCirculo(auxX,auxY,auxR);

#Pygame Ejecución

def print_matrix(matrix):
    for i in range(20):
        for j in range(20):
            if(matrix[i][j] == 0):
                pygame.draw.rect(screen,RED,((j*space + move[0]),(i*space + move[1]),10,10));
            else:
                pygame.draw.rect(screen,BLUE,((j*space + move[0]),(i*space + move[1]),10,10));


pygame.init();
screen = pygame.display.set_mode(display);

while True:
    for e in pygame.event.get():
        if(e.type == pygame.QUIT):
            sys.exit();

    screen.fill(WHITE);
    
    print_matrix(draw_circle(radio));

    pygame.display.flip();