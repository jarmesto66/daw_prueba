/* Crea una aplicación web que pida al usuario palabras continuamente hasta que el popup se deje vacío o se cancele.
A continuación, se eliminarán todas las palabras repetidas y además se ordenarán en español, pero en orden inverso (de la Z a la A)
 y se mostrará el resultado por pantalla.
Utilizar funciones flecha si se considera apropiado.
Ayuda: cancelar el popup devuelve null. */

function practica1() {
    const palabras = pedirPalabras();

    // Set elimina repetidas; [...] lo convierte de nuevo en array
    const unicas = [...new Set(palabras)];

    // FLECHA: al intercambiar a y b sale de la Z a la A
    unicas.sort((a, b) => b.localeCompare(a, 'es'));

    // join une el array con saltos de línea; en un <pre> se respetan
    document.getElementById("salida4_1").textContent = unicas.join("\n");
}

practica1();