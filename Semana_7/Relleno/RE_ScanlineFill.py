import pygame
import sys

# Dimensiones de la ventana
WIDTH, HEIGHT = 400, 400

# Colores
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)

class Edge:
    def __init__(self, start, end):
        if start[1] < end[1]:
            self.start = start
            self.end = end
        else:
            self.start = end
            self.end = start

        self.dx = self.end[0] - self.start[0]
        self.dy = self.end[1] - self.start[1]

        if self.dy != 0:
            self.m_inv = self.dx / self.dy
        else:
            self.m_inv = float('inf')  # Si la pendiente es infinita

def insert_edge(edges, edge):
    for i in range(len(edges)):
        if edges[i].start[1] == edge.start[1] and edges[i].start[0] > edge.start[0]:
            edges.insert(i, edge)
            return
        elif edges[i].start[1] > edge.start[1]:
            edges.insert(i, edge)
            return
    edges.append(edge)

def remove_edge(edges, y):
    return [edge for edge in edges if edge.end[1] != y]

def update_edges(edges):
    for edge in edges:
        edge.start = (edge.start[0] + edge.dx, edge.start[1] + edge.dy)
        edge.end = (edge.end[0] + edge.dx, edge.end[1] + edge.dy)

def draw_line(screen, start, end, color):
    pygame.draw.line(screen, color, start, end)

def scanline_fill(screen, edges, color):
    active_edges = []
    y_min = min(edge.start[1] for edge in edges)
    y_max = max(edge.end[1] for edge in edges)

    for y in range(y_min, y_max):
        for edge in edges:
            if edge.start[1] == y:
                insert_edge(active_edges, edge)

        active_edges = remove_edge(active_edges, y)
        active_edges.sort(key=lambda edge: edge.start[0])

        for i in range(0, len(active_edges), 2):
            start_x = int(active_edges[i].start[0])
            end_x = min(int(active_edges[i + 1].start[0]), WIDTH - 1)
            draw_line(screen, (start_x, y), (end_x, y), color)

        update_edges(active_edges)

def main():
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Scanline Fill Algorithm with Animation")
    screen.fill(WHITE)

    # Definir los puntos del polígono
    points = [(100, 100), (300, 100), (300, 300), (100, 300)]

    # Dibujar el polígono
    pygame.draw.polygon(screen, BLACK, points)

    edges = [Edge(points[i], points[(i + 1) % len(points)]) for i in range(len(points))]
    scanline_fill(screen, edges, RED)

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

