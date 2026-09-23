const salida5 = document.getElementById('salida5');

let suma = 0;
let multiplos = [];

for (let i = 1; i <= 50; i++) {
    if (i % 4 === 0) {
        multiplos.push(i);
        suma += i;
    }
}

let texto5 = "Números múltiplos de 4 del 1 al 50:\n";
texto5 += multiplos.join(", ") + "\n\n";
texto5 += "Total acumulado: " + suma;

salida5.textContent = texto5;