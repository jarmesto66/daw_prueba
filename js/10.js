const salida10 = document.getElementById('salida10');

let texto10 = "Triángulo inferior con N=20\n\n";
const n_10 = 20;

for (let i = 1; i <= n_10; i++) {
    let linea = "";
    for (let j = 0; j < i; j++) {
        linea += "* ";
    }
    texto10 += linea + "\n";
}

salida10.textContent = texto10;