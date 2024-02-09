import math


#Clases

class Polar:
    #Constructor
    def __init__(self,r,th):
        self.__r = r;
        self.__th = th;

    #Getters y Setters
    def get_r(self):
        return self.__r;

    def get_th(self):
        return self.__th;

    #Metodos
    def convert(self):
        print("Convirtiendo a Cartesianas");
        return Cart(round(self.__r*math.cos(self.__th*math.pi/180)),
                    round(self.__r*math.sin(self.__th*math.pi/180)));

    def print(self):
        print(f"r: {self.__r}, th: {self.__th}°")

class Cart:
    #Constructor
    def __init__(self,x,y):
        self.__x = x;
        self.__y = y;
    
    #Getters y Setters
    def get_x(self):
        return self.__x;

    def get_y(self):
        return self.__y;


    #Metodos
    def convert(self):
        print("Convirtiendo a Polares");
        return Polar(round(math.sqrt((self.__x*self.__x)+(self.__y*self.__y))),
                    round((math.atan(self.__y/self.__x)*(180/math.pi))));

    def print(self):
        print(f"x: {self.__x}, y: {self.__y}")