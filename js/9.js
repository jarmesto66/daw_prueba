const salida9 = document.getElementById('salida9');

let resultado9 = "Triangulo inferior con N=20\n\n";
const q = 20;

for (let i = 1; i <= q; i++) {
    let linea = "";
    for (let j = 0; j < i; j++) {
        linea = linea + "* ";
    }
    resultado9 = resultado9 + linea + "\n";
}

salida9.textContent = resultado9;