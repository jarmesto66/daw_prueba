/* Ejercicio 5.4: Recorre los <span class="precio"> y suma 0.10 a cada valor mostrado. */
var precios = document.querySelectorAll("#productos .precio"); // de vuelve NodeList con los 3 <span class="precio">

precios.forEach(function (precio) {                     // forEach con function, apartado 4.4
    var valor = parseFloat(precio.textContent);         // textContent devuelve un string ("3.50")
    precio.textContent = (valor + 0.10).toFixed(2);     // sumamos y mantenemos 2 decimales
});