import pygame
from pygame.locals import *
import sys

# Definir códigos de región
INSIDE = 0
LEFT = 1
RIGHT = 2
BOTTOM = 4
TOP = 8

# Función para calcular el código de región de un punto
def computeCode(x, y, xmin, ymin, xmax, ymax):
    code = INSIDE

    if x < xmin:
        code |= LEFT
    elif x > xmax:
        code |= RIGHT
    if y < ymin:
        code |= BOTTOM
    elif y > ymax:
        code |= TOP

    return code

# Función para recortar una línea
def cohenSutherlandClip(x1, y1, x2, y2, xmin, ymin, xmax, ymax):
    code1 = computeCode(x1, y1, xmin, ymin, xmax, ymax)
    code2 = computeCode(x2, y2, xmin, ymin, xmax, ymax)
    accept = False

    while True:
        # Ambos puntos están dentro de la región de recorte
        if code1 == 0 and code2 == 0:
            accept = True
            break
        # Ambos puntos están fuera de la región de recorte
        elif code1 & code2 != 0:
            break
        # Al menos un punto está fuera de la región de recorte, recorte la línea
        else:
            x = 0
            y = 0
            code_out = code1 if code1 != 0 else code2

            # Encuentra la intersección del punto exterior
            if code_out & TOP:
                x = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1)
                y = ymax
            elif code_out & BOTTOM:
                x = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1)
                y = ymin
            elif code_out & RIGHT:
                y = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1)
                x = xmax
            elif code_out & LEFT:
                y = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1)
                x = xmin

            # Actualizar el punto exterior con la intersección calculada
            if code_out == code1:
                x1, y1 = x, y
                code1 = computeCode(x1, y1, xmin, ymin, xmax, ymax)
            else:
                x2, y2 = x, y
                code2 = computeCode(x2, y2, xmin, ymin, xmax, ymax)

    if accept:
        return int(x1), int(y1), int(x2), int(y2)
    else:
        return None

# Colores
WHITE = (255, 255, 255)
RED = (255, 0, 0)

# Dimensiones de la pantalla
WIDTH, HEIGHT = 800, 600

# Inicializar Pygame
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Line Clipping")

# Coordenadas iniciales y finales de la línea
x1, y1 = 100, 100
x2, y2 = 700, 500

# Coordenadas de la región de recorte
xmin, ymin = 200, 200
xmax, ymax = 600, 400

# Bucle principal
while True:
    screen.fill(WHITE)

    # Dibujar la región de recorte
    pygame.draw.rect(screen, RED, (xmin, ymin, xmax - xmin, ymax - ymin), 2)

    # Dibujar la línea original
    pygame.draw.line(screen, RED, (x1, y1), (x2, y2), 2)

    # Recortar la línea
    clipped_line = cohenSutherlandClip(x1, y1, x2, y2, xmin, ymin, xmax, ymax)
    if clipped_line:
        pygame.draw.line(screen, RED, clipped_line[:2], clipped_line[2:], 2)

    # Manejo de eventos
    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()

    pygame.display.flip()
