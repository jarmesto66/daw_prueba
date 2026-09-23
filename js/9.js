const salida9 = document.getElementById('salida9');

let texto9 = "Triángulo inferior con N=20\n\n";
let n_9 = 20;

for (let i = n_9; i >= 1; i--) {
    let linea = "";
    for (let j = 0; j < i; j++) {
        linea += "* ";
    }
    texto9 += linea + "\n";
}

salida9.textContent = texto9;