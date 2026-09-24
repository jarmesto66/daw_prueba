const salida8 = document.getElementById('salida8');

let resultado8 = "Diagonal inversa con N=20\n\n";
const n = 20;

for (let i = 0; i < n; i++) {
    let linea = "";
    let espacios = n - 1 - i;
    for (let j = 0; j < espacios; j++) {
        linea = linea + " ";
    }
    linea = linea + "*";
    resultado8 = resultado8 + linea + "\n";
}

salida8.textContent = resultado8;