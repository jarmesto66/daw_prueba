const salida4 = document.getElementById('salida4');

let nota = 9.5;
let texto4 = "Nota: " + nota + "\n\n";

if (nota >= 9) {
    texto4 += "Sobresaliente\n";
    texto4 += "¡Felicidades!\n";
} else if (nota >= 7 && nota < 9) {
    texto4 += "Notable\n";
} else if (nota >= 5 && nota < 7) {
    texto4 += "Aprobado\n";
} else {
    texto4 += "Suspenso\n";
}

salida4.textContent = texto4;