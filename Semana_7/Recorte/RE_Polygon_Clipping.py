import pygame
from pygame.locals import *
import sys

# Clase para representar un punto en 2D
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

# Función para calcular la intersección de dos líneas
def intersection(p1, p2, s, e):
    a1 = e.y - s.y
    b1 = s.x - e.x
    c1 = a1 * s.x + b1 * s.y

    a2 = p2.y - p1.y
    b2 = p1.x - p2.x
    c2 = a2 * p1.x + b2 * p1.y

    determinant = a1 * b2 - a2 * b1

    if determinant == 0:
        return None
    else:
        x = (b2 * c1 - b1 * c2) / determinant
        y = (a1 * c2 - a2 * c1) / determinant
        return Point(x, y)

# Función para recortar un polígono con un rectángulo
def sutherlandHodgman(subjectPolygon, clipPolygon):
    outputList = subjectPolygon
    clipPolygonVertices = len(clipPolygon)

    for i in range(clipPolygonVertices):
        inputList = outputList
        outputList = []

        # Obtener vértice actual y siguiente del rectángulo de recorte
        s = clipPolygon[i]
        e = clipPolygon[(i + 1) % clipPolygonVertices]

        for j in range(len(inputList)):
            # Obtener vértice actual y siguiente del polígono de entrada
            p1 = inputList[j]
            p2 = inputList[(j + 1) % len(inputList)]

            # Verificar si el punto está dentro o fuera del rectángulo de recorte
            inside_point = p1.x >= s.x and p1.x <= e.x and p1.y >= s.y and p1.y <= e.y

            # Si el primer punto está dentro, agregarlo a la lista de salida
            if inside_point:
                outputList.append(p1)

            # Calcular la intersección y agregarla a la lista de salida
            if (p1.y < p2.y) != inside_point:
                inter = intersection(p1, p2, s, e)
                if inter:
                    outputList.append(inter)

        subjectPolygon = outputList

    return outputList

# Colores
WHITE = (255, 255, 255)
RED = (255, 0, 0)

# Dimensiones de la pantalla
WIDTH, HEIGHT = 800, 600

# Inicializar Pygame
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Polygon Clipping")

# Coordenadas del polígono de sujeto
subjectPolygon = [Point(100, 100), Point(700, 100), Point(700, 500), Point(100, 500)]

# Coordenadas del polígono de recorte (rectángulo)
clipPolygon = [Point(200, 200), Point(600, 200), Point(600, 400), Point(200, 400)]

# Bucle principal
while True:
    screen.fill(WHITE)

    # Dibujar el polígono de sujeto
    pygame.draw.polygon(screen, RED, [(p.x, p.y) for p in subjectPolygon], 2)

    # Dibujar el polígono de recorte
    pygame.draw.polygon(screen, RED, [(p.x, p.y) for p in clipPolygon], 2)

    # Recortar el polígono
    clippedPolygon = sutherlandHodgman(subjectPolygon, clipPolygon)

    # Verificar si el polígono recortado tiene al menos 3 puntos antes de dibujarlo
    if len(clippedPolygon) >= 3:
        pygame.draw.polygon(screen, RED, [(p.x, p.y) for p in clippedPolygon], 0)

    # Manejo de eventos
    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()

    pygame.display.flip()
