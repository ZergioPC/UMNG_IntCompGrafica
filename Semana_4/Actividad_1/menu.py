import math;

#Clase encargada de graficar
class graficar:
    #Constructor
    def __init__(self,a,b):
        self.screen = [[False]*11 for _ in range(10)];
        self.a = a;
        self.b = b;

    #Metodos
    def parabola(self):
        x = 0;
        y = 0;
        for i in range(11):
            y = 9 + math.floor(-((x-5)**2)*0.5);

            if(y >= 0) and (y<10):
                self.screen[y][x] = True;    
                pass

            x = x+1;
    
    def lineal(self):
        x = 0;
        for i in range(11):
            y = (9-x);

            if(y >= 0) and (y < 10):
                self.screen[y][x] = True;    
            
            x = x+1;

    def sin(self):
        x = 0;
    
        for i in range(11):
            y = 4 - math.floor(math.sin(x)*5);

            if(y >= 0) and (y < 10):
                self.screen[y][x] = True;
            
            x = x+1;

    def draw(self):
        for i in self.screen:
            arr = [];
            for j in i:
                if (j == True):
                    arr.append("0");
                else:
                    arr.append(".")
            print(arr)

#Menú principal
graficador = None;

def retorno():
    print("Desea ver otra grafica?");
    print("1. Si \t 2.No");
    sel = int(input(""));

    if sel == 1:
        menu();
    else:
        pass;

def menu():
    graficador  = graficar(0,11);

    print("- - - Graficador de Funciones - - -");
    print("Seleccione la función a graficar");
    print("1. Función lineal f(x)= x");
    print("2. Función Parabolica f(x)= x^2")
    print("3. Función Seno f(x)= sin(x)")
    
    sel = int(input(""));

    if sel == 1:
        graficador.lineal();
        graficador.draw();
        retorno();
    elif sel == 2:
        graficador.parabola();
        graficador.draw();
        retorno();
    elif sel == 3:
        graficador.sin();
        graficador.draw();
        retorno();
    else:
        print("Valor no valido\n\n\n")
        retorno();

menu();