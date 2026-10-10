/* Ejercicio 5.6: Sustituye el primer elemento de #lista por otro con texto:
Producto destacado <span class="precio">9.99</span> €. */

var lista = document.getElementById("lista");
var primerElemento = lista.querySelector("li"); //primer <li>
var precio = primerElemento.querySelector(".precio"); // seleccionamos el span con clase precio

precio.textContent = "9.99"; // cambiamos el contenido del span
primerElemento.innerHTML = "PRODUCTO DESTACADO => " + primerElemento.innerHTML; // cambiamos el contenido del primer <li> con el nuevo texto y el contenido original