import math;

class graficar:
    def __init__(self):
        self.screen = [[False]*10 for _ in range(10)];
    
    def parabola(self):
        x = 0;
        y = 9;
        for i in range(10):
            y = y-(x**2);

            if(y >= 0):
                self.screen[y][x] = True;    
            
            x = x+1;
    
    def lineal(self):
        x = 0;
        for i in range(10):
            y = (9-x);

            if(y >= 0) and (y < 10):
                self.screen[y][x] = True;    
            
            x = x+1;

    def sin(self):
        x = 0;
    
        for i in range(10):
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