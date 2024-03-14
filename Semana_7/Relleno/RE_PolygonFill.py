import pygame
import sys

# Dimensiones de la ventana
WIDTH, HEIGHT = 400, 400

# Colores
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)

def draw_line(screen, start, end, color):
    pygame.draw.line(screen, color, start, end)

def polygon_fill(screen, points, color):
    # Encontrar los límites del polígono
    min_x = min(point[0] for point in points)
    max_x = max(point[0] for point in points)
    min_y = min(point[1] for point in points)
    max_y = max(point[1] for point in points)

    # Crear una lista de bordes
    edges = []
    for i in range(len(points)):
        edge_start = points[i]
        edge_end = points[(i + 1) % len(points)]
        edges.append((edge_start, edge_end))

    # Inicializar la lista de bordes activos
    active_edges = []

    # Escanear cada línea horizontalmente
    for y in range(min_y, max_y + 1):
        # Actualizar la lista de bordes activos
        active_edges = [edge for edge in active_edges if edge[1][1] != y]
        for edge in edges:
            if min(edge[0][1], edge[1][1]) < y <= max(edge[0][1], edge[1][1]):
                active_edges.append(edge)

        # Ordenar los bordes activos por coordenada x
        active_edges.sort(key=lambda edge: edge[0][0])

        # Rellenar entre los bordes activos
        for i in range(0, len(active_edges), 2):
            start_x = active_edges[i][0][0]
            end_x = active_edges[i + 1][0][0]
            draw_line(screen, (start_x, y), (end_x, y), color)

            # Incrementar o decrementar las coordenadas x de los bordes activos
            active_edges[i] = ((start_x + 1, y), active_edges[i][1])
            active_edges[i + 1] = ((end_x - 1, y), active_edges[i + 1][1])

def main():
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Polygon Fill Algorithm with Animation")
    screen.fill(WHITE)

    # Definir los puntos del polígono
    points = [(100, 100), (300, 100), (300, 300), (200, 250), (100, 300)]

    # Dibujar el polígono
    pygame.draw.polygon(screen, BLACK, points)

    # Rellenar el polígono
    polygon_fill(screen, points, RED)

    clock = pygame.time.Clock()
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        pygame.display.flip()
        clock.tick(60)

if __name__ == "__main__":
    main()
