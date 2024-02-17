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

            x = x+1;
    
    def parabola(self,k):
        x = self.a;
        y = 0;
        self.min = k*(x**2);

        self.renderZone();
        
        for i in range(self.b-self.a):
            y = (k*(x**2))-self.min;

            if(y >= 0) and (y<10):
                self.screen[math.floor(y)][i] = True;    
            
            print(f"x:{i} - y:{math.floor(y)}")

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

        aux = 10+math.floor(self.min);
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
                    arr.append("X ");
            if(aux < 10):
                print(f"[0{aux}]{arr}");
            else:
                print(f"[{aux}]{arr}");
            print("")
            aux = aux-1;
        
        aux = math.floor(self.min);
        for i in range(self.b-self.a):
            if(aux < 9):
                aux2[i]= f"0{aux +1}";
            else:
                aux2[i]= f"{aux +1}";
            aux = aux+1;
        
        print(f"[##]{aux2}")


# Pruebas
x = graficar();
x.a = 20;
x.b = 30;
x.parabola(0.05)
x.draw();
