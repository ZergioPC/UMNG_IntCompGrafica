import pygame
import sys

# Dimensiones de la ventana
WIDTH, HEIGHT = 400, 400

# Colores
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)

def flood_fill(screen, x, y, target_color, fill_color):
    stack = [(x, y)]

    while stack:
        pygame.time.delay(10)  # Pequeño retraso para la animación
        pygame.event.pump()  # Procesar eventos para evitar bloqueos

        current_x, current_y = stack.pop()

        if screen.get_at((current_x, current_y)) == target_color:
            screen.set_at((current_x, current_y), fill_color)

            # Agregar vecinos a la pila
            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                next_x, next_y = current_x + dx, current_y + dy
                if 0 <= next_x < WIDTH and 0 <= next_y < HEIGHT:
                    stack.append((next_x, next_y))

        pygame.display.flip()  # Actualizar la pantalla para mostrar el progreso de la animación

def main():
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Flood Fill Algorithm with Animation")
    screen.fill(WHITE)

    # Definir los puntos del polígono
    points = [(100, 100), (300, 100), (300, 300), (100, 300)]

    # Dibujar el polígono
    pygame.draw.polygon(screen, BLACK, points)

    # Rellenar el polígono
    for x, y in points:
        flood_fill(screen, x, y, WHITE, RED)

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
