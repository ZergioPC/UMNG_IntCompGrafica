import math

#Clases

class Polar:
    def __init__(self,r,th):
        self.r = r;
        self.th = th;

    def convert(self):
        print("Convirtiendo a Cartesianas");
        return Cart(self.r*math.cos(self.th*math.pi/180),
                    self.r*math.sin(self.th*math.pi/180));

    def print(self):
        print(f"r: {self.r}, th: {self.th}")

class Cart:
    def __init__(self,x,y):
        self.x = x;
        self.y = y;

    def convert(self):
        print("Convirtiendo a Polares");
        return Polar(math.sqrt((self.x*self.x)+(self.y*self.y)),
                    (math.atan(self.y/self.x)*(180/math.pi)));

    def print(self):
        print(f"x: {self.x}, y: {self.y}")


#Codigo
ej = Cart(5,7);
ej.print();

cart = ej.convert();
cart.print();

back = cart.convert();
back.print();