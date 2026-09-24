const salida7 = document.getElementById('salida7');

let resultado7 = "Diagonal con N=20\n\n";
const r = 20;

let contador7 = 0;
while (contador7 < r) {
    let linea = "";
    let j = 0;
    while (j < contador7) {
        linea = linea + " ";
        j = j + 1;
    }
    linea = linea + "*";
    resultado7 = resultado7 + linea + "\n";
    contador7 = contador7 + 1;
}

salida7.textContent = resultado7;