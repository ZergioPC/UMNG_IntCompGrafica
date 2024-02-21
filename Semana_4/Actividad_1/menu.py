import graficador as gr;
import math;

graficador = None;

#Menus Funciones
def m_sin():
        print("Escriba el valor de la amplitud");
        sel = float(input(""));
        graficador.sin(sel);
        graficador.draw();
        retorno();

def m_parabola():
    print("Escriba el valor de la apertura K");
    sel = float(input(""));
    graficador.parabola(sel);
    graficador.draw();
    retorno()

def m_lineal():
    print("Escriba el valor de la pendiente");
    sel = float(input(""));
    graficador.lineal(sel);
    graficador.draw();
    retorno()

#Menus extras
def rango():
    print("Indique el valor de X inicial (Solo números positivos)");
    a = math.floor(int(input("")));
    graficador.setA(a);
    print("Indique el rango de graficación (Maximo 10)");
    b = math.floor(int(input("")));
    graficador.setB((b+a));
    
def retorno():
    print("Desea ver otra grafica?");
    print("1. Si \t 2.No");
    sel = int(input(""));

    if sel == 1:
        menu();
    else:
        pass;

# Menu Principal
def menu():
    global graficador;
    graficador = gr.graficar();

    print("- - - Graficador de Funciones - - -");
    print("Seleccione la función a graficar");
    print("1. Función lineal f(x)= x");
    print("2. Función Parabolica f(x)= x^2")
    print("3. Función Seno f(x)= sin(x)")
    
    sel = int(input(""));

    if sel == 1:
        rango();
        m_lineal();
    elif sel == 2:
        rango();
        m_parabola();
    elif sel == 3:
        rango();
        m_sin();
    else:
        print("Valor no valido\n\n\n")
        retorno();

menu();