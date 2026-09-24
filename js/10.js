const salida10 = document.getElementById('salida10');

let resultado10 = "Triangulo inferior con N=20\n\n";
const s = 20;

for (let contador10 = s; contador10 >= 1; contador10--) {
    let linea = "";
    for (let contador11 = 0; contador11 < contador10; contador11++) {
        linea = linea + "* ";
    }
    resultado10 = resultado10 + linea + "\n";
}

salida10.textContent = resultado10;