// Pide palabras hasta que se deje vacío o se cancele. Devuelve TODAS (con repetidas)
function pedirPalabras() {
    const palabras = [];

    let palabra = prompt("Introduce una palabra (deja vacío o cancela para terminar):");

    while (palabra !== null && palabra.trim() !== "") {
        palabras.push(palabra.trim());
        palabra = prompt("Introduce otra palabra (deja vacío o cancela para terminar):");
    }

    return palabras;
}