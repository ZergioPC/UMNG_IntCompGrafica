import pygame

#Colores
RED = (100,0,0);
GREEN = (0,100,0);
BLUE = (0,0,100);
WHITE = (250,250,250);
BLACK = (0,0,0);
GRAY = (100,100,100);

# pygame setup
pygame.init();

display = [600,400];
space = 10;

#TABLERO
def bresenham_line(x0, y0, x1, y1):
    dx = abs(x1 - x0);
    dy = abs(y1 - y0);
    steep = dy > dx;

    if steep:
        x0, y0 = y0, x0;
        x1, y1 = y1, x1;
    
    swapped = False;

    if x0 > x1:
        x0, x1 = x1, x0;
        y0, y1 = y1, y0;
        swapped = True;

    dx = x1 - x0;
    dy = y1 - y0;

    error = int(dx / 2.0);
    ystep = 1 if y0 < y1 else -1;
    
    y = y0;
    points = [];

    for x in range(x0, x1 + 1):
        coord = (y, x) if steep else (x, y);
        points.append(coord);
        error -= abs(dy);
        if error < 0:
            y += ystep;
            error += dx;
    if swapped:
        points.reverse();
    return points;

def draw_line(matrix, x0, y0, x1, y1):
    points = bresenham_line(x0, y0, x1, y1);
    for point in points:
        x, y = point;
        if 0 <= x < len(matrix) and 0 <= y < len(matrix[0]):
            matrix[x][y] = 1;

def print_matrix(matrix):
    for i in range(20):
        for j in range(20):
            if(matrix[i][j] == 1):
                pygame.draw.rect(screen,RED,((j*space),(i*space),10,10));
            else:
                pygame.draw.rect(screen,BLUE,((j*space),(i*space),10,10));


# Crear una matriz de 20x20 llena de espacios en blanco
matrix = [['0' for _ in range(20)] for _ in range(20)]

# Dibujar una línea de (1, 1) a (18, 18)

while True:
    print("- - - Graficar Círculo - - -");
    auxX1 = int(input("Ingrese la Coordenada x1 (menor a 20):  "));
    auxY1 = int(input("Ingrese la Coordenada y1 (menor a 20):  "));

    auxX2 = int(input("Ingrese la Coordenada x2 (menor a 20):  "));
    auxY2 = int(input("Ingrese la Coordenada y2 (menor a 20):  "));
    break;

draw_line(matrix, auxX1, auxY1, auxX2, auxY2)

#Pygame Ejecución

screen = pygame.display.set_mode(display);
running = True;

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False;

    screen.fill(WHITE);

    print_matrix(matrix);

    pygame.display.flip();

pygame.quit();