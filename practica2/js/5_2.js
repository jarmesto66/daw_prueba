/* Ejercicio 5.2: Del <li id="p1">, muestra en #log su innerHTML y su textContent en dos líneas. ¿Son iguales? */
var p1 = document.getElementById("p1"); /* Seleccionamos el elemento con id "p1" */
var log = document.getElementById("log"); /* Seleccionamos el elemento con id "log" */
/* Mostramos en #log el innerHTML y el textContent del elemento p1 en dos líneas */
log.innerHTML += "\n" + p1.innerHTML + "<br>";
log.innerHTML += "\n" + p1.textContent + "<br>";
if (p1.innerHTML === p1.textContent) { /* Comparamos si innerHTML y textContent son iguales */
    log.innerHTML += "\nSon iguales"; /* Si son iguales, añadimos un mensaje indicando que son iguales */
} else {
    log.innerHTML += "\nNo son iguales"; /* Si no son iguales, añadimos un mensaje indicando que no son iguales */
}
    /* Las líneas 2 y 3 se ven iguales, pero no lo son.
    Al escribir con innerHTML, el navegador interpretó el <span class="precio">
    de la línea 2 y lo convirtió en un elemento real.
    Por eso el 3.50 de esa línea sale en negrita y el de la línea 3 no,
    ya que la regla .precio { font-weight: bold; } solo se aplica al <span>.
    Lo que realmente comparaste en el if fueron las cadenas:
        innerHTML: Café <span class="precio">3.50</span> €
        textContent: Café 3.50 €
        
    innerHTML devuelve el marcado y textContent solo el texto.
    */