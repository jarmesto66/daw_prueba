/* Ejercicio 5.1: En #productos, cuenta cuántos <span class="precio"> hay y escribe en #log: “Hay X precios listados”. */
var spanPrecios = document.querySelectorAll("#productos .precio");
var log = document.getElementById("log");
log.innerHTML = "Hay " + spanPrecios.length + " precios listados.<br>";