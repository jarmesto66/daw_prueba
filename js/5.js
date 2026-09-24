const salida5 = document.getElementById('salida5');

let suma = 0;
let i = 1;

while (i <= 50) {
    if (i % 4 == 0) {
        suma += i;
    }
    i += 1;
}

let resultado5 = "Suma de multiplos de 4 del 1 al 50:\n";
resultado5 = resultado5 + "Total: " + suma;

salida5.textContent = resultado5;