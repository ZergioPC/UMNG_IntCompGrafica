matrix1=[
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

matrix2=[
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

def matrixTimes(matA,matB):
   
    if(len(matA) != len(matB[0])):
        return "error: tamaño de las matrices no permite la multiplicación";
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

def matrixShow(matrix):
    if(type(matrix) == str):
        print(matrix);
    elif(type(matrix) == list):
        for i in range(len(matrix)):
            print(matrix[i]);

matrixShow(matrixTimes(matrix1,matrix2));
