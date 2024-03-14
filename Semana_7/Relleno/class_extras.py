import math,pygame;

def matrixRotar(vector,a):
    vector = [round((vector[0]*math.cos(math.radians(a)))-(vector[1]*math.sin(math.radians(a))),3),
            round((vector[0]*math.sin(math.radians(a)))+(vector[1]*math.cos(math.radians(a))),3)]; #Matriz de rotación
    return vector;

def traslate(vector,dir):
    vector[0] = dir[0] + vector[0];
    vector[1] = dir[1] - vector[1];
    return vector;