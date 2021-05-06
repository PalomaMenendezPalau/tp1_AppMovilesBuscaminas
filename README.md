# tp1_AppMovilesBuscaminas

El juego esta casi terminado. (obvio que no llegue al diseño me refiero a la funcionalidad) 
me trabe muchisimo armando las banderas para marcar quien gana. 
cree una funcion llamada addFlag para agregar las banderas y para quitarlas. 
esta la llamo haciendo el click derecho dentro de la clase create board. Creo que mi problema esta ahi porque lo puse abajo del click iz
que funciona bien pero estos 2 metodos estan dentro de el for que recorre la creacion del tablero. Asumo que como designo el click derecho ahi adentro me recorre
todas las banderas. 

Lo que mas me costo y llevo tiempo fue el tema de que el buscaminas tiene los numeros de las bombas que tiene al lado entonces al principio me pasaba que me sumaba mal 
ya que tuve que manejar las excepciones de los numeros dle costado del tablero para que no me sume al contador de bombas. Y tuve que volver a armar esta validacion cuando tocaba 
una cajita vacia. solo se abran todas las de al lado del cuadrado pero no los numeros que estaban pegados a los costados. 

Explico esto para que se entienda -> de la posicion 20 si yo hago click ahi y no hay una bomba tiene que mostrarse 1 solo numero si su valor es un numero al lado de la bomba o si 
es una cajita vacia en ese caso tengo que mostrar todas las de al lado. pero las de al lado serian la 10, la 11, la 21 , la 30 y la 31. 
la 19 en el array es un campo que esta pegado pero en mi grid no entonces tuve que hacer las validaciones para que a este no se sumen ni los numeros de bombas cercanas 
ni que si esta era vacia se visualice. 

