const salida8 = document.getElementById('salida8');

let texto8 = "Diagonal inversa con N=20\n\n";
let n_8 = 20;

for (let i = 0; i < n_8; i++) {
    let linea = "";
    // Agregar espacios decrecientes
    for (let j = 0; j < (n_8 - 1 - i); j++) {
        linea += " ";
    }
    // Agregar el asterisco
    linea += "*";
    texto8 += linea + "\n";
}

salida8.textContent = texto8;