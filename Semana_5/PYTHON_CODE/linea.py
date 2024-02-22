"""
Created on Thu Feb 22 11:42:30 2024

@author: Sergio Palacios
"""
import pygame
import math

#Get Coordenadas;

color = (0,0,255);
arr = []

print("|- - - Dibujar una Linea - - -|");
x1 = int(input("Ingrese la Coordenada x1:  "))
y1 = int(input("Ingrese la Coordenada y1:  "))
x2 = int(input("Ingrese la Coordenada x2:  "))
y2 = int(input("Ingrese la Coordenada y2:  "))

m =(y2-y1)/(x2-x1)
rango = x2 - x1 + 1
print(rango)
for i in range(rango):
    x = x1+i
    y = math.floor(m*(x1+i))
    arr.append([x,y])
    
# pygame setup
pygame.init()
pygame.display.set_caption('Dibujar una Linea')
screen = pygame.display.set_mode((600, 400))
clock = pygame.time.Clock()
running = True

for i in range(rango):
    print(f"x:{arr[i][0]+300} y:{arr[i][1]+200}")
        
while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # fill the screen with a color to wipe away anything from last frame
    screen.fill((140,140,140))

    #Lineas del Plano
    pygame.draw.rect(screen,"black",(298,0,4,400))
    pygame.draw.rect(screen,"black",(0,198,600,4))
    

    # RENDER YOUR GAME HERE
    pygame.draw.rect(screen,color,(5,5,1,1))
    
    for i in range(rango):
        pygame.draw.rect(screen,color,(arr[i][0]+300,arr[i][1]+200,1,1)) 
        
    # flip() the display to put your work on screen
    rotar = pygame.transform.flip(screen, False, True)
    screen.blit(rotar,(0,0))
    pygame.display.flip()

    clock.tick(60)  # limits FPS to 60

pygame.quit()