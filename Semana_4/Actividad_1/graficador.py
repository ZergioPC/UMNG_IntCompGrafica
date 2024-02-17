import math;

class graficar:
    #Constructor
    def __init__(self):
        self.screen = [[5]*11 for _ in range(10)];
        self.a = 0;
        self.b = 10;
        self.min = None;

    #Metodos internos

    def renderZone(self):
        x = 0;
        y = 0;
        for i in self.screen:
            for j in range(self.b-self.a):
                self.screen[y][x] = False;
                x = x+1;
            y = y+1;
            x = 0;

    #Matematicas

    def lineal(self,m):
        x = self.a;
        y = 0;
        self.min = m*(x)

        self.renderZone();

        for i in range(self.b-self.a):
            y = m*(x-self.a);
            
            if (y>=0) and (y<10):
                self.screen[math.floor(y)][i] = True;   
                pass

            x = x+1;
    
    def parabola(self,k):
        x = self.a;
        y = 0;
        self.min = k*(x**2);

        self.renderZone();
        
        for i in range(self.b-self.a):
            y = k*(x**2);

            if(y >= 0) and (y<10):
                self.screen[math.floor(y)][i] = True;    
                pass
            
            print(f"x:{x}(i:{i}) - y:{y-self.min}")

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

    #Dibujado

    def draw(self):
        #Cambio de Orientación
        ord = len(self.screen)-1;

        aux = 10+self.min;
        aux2 = ["X "]*11;
        arry =[""]*(ord+1);

        for i in self.screen:
            arry[ord] = i;
            ord = ord-1;
        
        #Graficado
        for i in arry:
            arr = [];
            for j in i:
                if (j == True):
                    arr.append("0 ");
                elif(j == False):
                    arr.append(". ");
                else:
                    arr.append("X ")
            print(f"[{aux}]{arr}")
            print("")
            aux = aux-1;
        
        aux = self.a;
        for i in range(self.b-self.a):
            aux2[i]= f"{aux +1}";
            aux = aux+1;
        
        print(f"[# ]{aux2}")


# Pruebas
x = graficar();
x.a = 10;
x.b = 18;
#x.parabola(0.5)
x.lineal(1);
x.draw();
