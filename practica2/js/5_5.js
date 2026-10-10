/* Ejercicio 5.5: Añade al final de la lista un elemento con texto: Tila y precio 2.20€. */
var lista = document.getElementById("lista");
var nuevoElemento = document.createElement("li");
var nuevoPrecio = document.createElement("span");
nuevoPrecio.className = "precio";
nuevoPrecio.textContent = "2.20";
nuevoElemento.append("Tila ", nuevoPrecio, "€");
lista.append(nuevoElemento);