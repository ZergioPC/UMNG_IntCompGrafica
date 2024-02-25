import pygame, sys, math

pygame.init();

res = (600,400);

pantalla = pygame.display.set_mode(res);

while True:
    for e in pygame.event.get():
        if(e.type == pygame.QUIT):
            sys.exit();
    
    pantalla.fill((255,100,100));

    pygame.display.flip();