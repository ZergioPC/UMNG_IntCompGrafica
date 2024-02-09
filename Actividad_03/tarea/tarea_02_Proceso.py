import tarea_02_Clases as clases

print("\n- - - Conversion de Cartesianas a Polares - - -\n");
cartEj1 = clases.Cart(4,6);
cartEj1.print();
polarEj1 = cartEj1.convert();
polarEj1.print();

print("\n\n- - - Conversion de Polares a Cartesianas - - -\n");
polarEj2 = clases.Polar(5,60);
polarEj2.print();
cartEj2 = polarEj2.convert();
cartEj2.print();