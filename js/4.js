const salida4 = document.getElementById('salida4');

let nota = 9.5;
let resultado4 = "Nota: " + nota + "\n\n";

if (nota >= 9) {
    resultado4 += "Sobresaliente\n";
    resultado4 += "¡Felicidades!\n";
} else if (nota >= 7 && nota < 9) {
    resultado4 += "Notable\n";
} else if (nota >= 5 && nota < 7) {
    resultado4 += "Aprobado\n";
} else {
    resultado4 += "Suspenso\n";
}

salida4.textContent = resultado4;