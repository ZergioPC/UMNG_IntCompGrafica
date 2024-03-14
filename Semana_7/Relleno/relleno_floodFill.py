import pygame,sys,math;

#Ajustes de la ventana
alto = 400;
largo = 600;

pygame.init();
pygame.display.set_caption("Relleno por Inundación");
display = pygame.display.set_mode((largo,alto));

while True:
    for e in pygame.event.get():
        if(e.type == pygame.QUIT):
            sys.exit();

    display.fill((255,255,255));
    pygame.display.flip();