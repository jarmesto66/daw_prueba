const salida7 = document.getElementById('salida7');

let texto7 = "Diagonal con N=20\n\n";
let n_7 = 20;

for (let i = 0; i < n_7; i++) {
    let linea = "";
    // Agregar espacios según la posición
    for (let j = 0; j < i; j++) {
        linea += " ";
    }
    // Agregar el asterisco
    linea += "*";
    texto7 += linea + "\n";
}

salida7.textContent = texto7;