import math;

class graficar:
    #Constructor
    def __init__(self):
        self.screen = [[5]*11 for _ in range(10)];
        self.a = 0;
        self.b = 10;

    #Metodos    

    def renderZone(self):
        x = 0;
        y = 0;
        for i in self.screen:
            for j in range(self.b-self.a):
                self.screen[y][x] = False;
                x = x+1;
            y = y+1;
            x = 0;

    def lineal(self):
        x = 0;
        a = self.a;
        self.renderZone();

        for i in range(self.b-self.a):
            y = a-(10-self.a);
            
            if (y>=0) and (y<10):
                self.screen[y][x] = True;    
            print(f"x:{x} - y:{y} (a:{a})");
            
            x = x+1;
            a = a+1;
    
    def parabola(self):
        x = 0;
        y = 0;
        for i in range(11):
            y = 9 + math.floor(-((x-5)**2)*0.5);

            if(y >= 0) and (y<10):
                self.screen[y][x] = True;    
                pass

            x = x+1;

    def sin(self):
        x = 0;
    
        for i in range(11):
            y = 4 - math.floor(math.sin(x)*5);

            if(y >= 0) and (y < 10):
                self.screen[y][x] = True;
            else:
                self.screen[y][x] = False;
            
            x = x+1;

    def draw(self):
        aux = 0;
        aux2 = ["X"]*11;
        
        #
        for i in self.screen:
            arr = [];
            for j in i:
                if (j == True):
                    arr.append("0");
                elif(j == False):
                    arr.append(".");
                else:
                    arr.append("X")
            print(f"[{aux}]{arr}")
            print("")
            aux = aux+1;
        
        aux = 0;
        for i in range(self.b-self.a):
            aux2[i]= f"{aux +1}";
            aux = aux+1;
        
        print(f"[O]{aux2}")


# Pruebas
x = graficar();
x.a = 5;
x.b = 12;
x.lineal();
x.draw();