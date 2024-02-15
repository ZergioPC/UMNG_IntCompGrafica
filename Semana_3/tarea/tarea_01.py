import math

#Retorno
def retorno():
    print("Desea realizar otra conversión");
    print("1. Si \t 2.No");
    sel = int(input(""));

    if sel == 1:
        menu();
    else:
        pass;

#Conversiones
def toPolar():
    x = float(input("Ingrese el valor de la coordenada X: "));
    y = float(input("Ingrese el valor de la coordenada Y: "));
    
    r = round(math.sqrt((x*x)+(y*y)));
    th = round(math.atan(y/x)*(180/math.pi));

    print(f"Conversión Polares:\n r:{r} th:{th}°")
    retorno();


def toCart():
    r = float(input("Ingrese el valor del radio r: "));
    th = float(input("Ingrese el valor del angulo th: "));
    
    x = round(r*math.cos(th*math.pi/180));
    y = round(r*math.sin(th*math.pi/180));

    print(f"Conversión a Cartesianas:\n x:{x} y:{y}")
    retorno();

#Menu
def menu():
    print("- - - MENU DE CONVERSIONES - - -");
    print("Digite el numero segun la opcion requerida");
    print("1. Cartesianas a Polares");
    print("2. Polares a Cartesianas");
    sel = input("");

    if int(sel) == 1:
        toPolar();
    elif int(sel) == 2:
        toCart();
    else:
        print("Seleccion no valida \n\n");
        menu();

#Ejecucion
menu();