import math

# Función de multiplicación de matrices

def matrixTimes(matA,matB):
    if(len(matA) != len(matB[0])):
        return "Error, Tamaño de matrices no valido";
    else:
        matrixAux = [];
        
        for i in range(len(matA[0])):
            aux = [];
            for j in range(len(matB)):
                xd=0;
                for a in range(len(matA)):
                    xd = xd + matA[i][a]*matB[a][j];
                aux.append(xd);
            matrixAux.append(aux);    
        return matrixAux;

#Función de escalado

def escalar(vect,escalar):
    result = vect;
    
    for i in range(len(result)):
            result[i] = result[i]*escalar[i];

    return result;

# Función de Rotación

def rotacion(vector,a):
    rotar = [round((vector[0]*math.cos(math.radians(a)))-(vector[1]*math.sin(math.radians(a)))),
            round((vector[0]*math.sin(math.radians(a)))+(vector[1]*math.cos(math.radians(a))))];

    return rotar;

#Mostrar matrices

def matrixShow(matrix):
    for i in range(len(matrix)):
        print(matrix[i]);
