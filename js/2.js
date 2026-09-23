const salida2 = document.getElementById('salida2');
 
let contador = 0;
let texto2 = "Contador inicial: " + contador + "\n\n";
 
for (let i = 1; i <= 5; i++) {
    contador++;
    texto2 += "Iteración " + i + ": contador = " + contador + "\n";
}
 
texto2 += "\nResultado final: " + contador;
 
salida2.textContent = texto2;