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

screen = pygame.display.set_mode(display);
running = False;

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

# Ejemplo de uso con un radio de 8

print (draw_circle(8))



#Pygame Ejecución
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False;

    screen.fill(WHITE);


    pygame.display.flip();

pygame.quit();