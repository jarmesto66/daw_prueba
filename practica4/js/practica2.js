/* Crea una aplicación web que pida al usuario palabras continuamente hasta que el popup se deje vacío o se cancele.
Crear una función que recibirá todas las palabras y devolverá un mapa que contenga como clave cada palabra y cuyo valor
 será el número de veces que aparece esa palabra en el array. Mostrar los resultados por pantalla.
Ayuda: Como en las 2 prácticas se pide introducir las palabras y devolver el resultado de la misma forma,
 podéis sacar esa parte del código a un script común que utilicen las 2 prácticas (main.js). */

function contarPalabras(palabras) {
    const mapa = new Map();

    for (let i = 0; i < palabras.length; i++) {
        const palabra = palabras[i];

        if (mapa.has(palabra)) {
            mapa.set(palabra, mapa.get(palabra) + 1);
        } else {
            mapa.set(palabra, 1);
        }
    }

    return mapa;
}

function practica2() {
    const palabras = pedirPalabras();
    console.log(palabras);
    const mapa = contarPalabras(palabras);

    let texto = "";

    // FLECHA: en el forEach de un Map el orden es (valor, clave)
    mapa.forEach((veces, palabra) => {
        texto += palabra + ": " + veces + "\n";
    });

    document.getElementById("salida4_2").textContent = texto;
}

practica2();