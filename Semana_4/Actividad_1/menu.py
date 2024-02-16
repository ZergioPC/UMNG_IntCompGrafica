import graficador as gr;

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
    graficador  = gr.graficar(0,11);

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