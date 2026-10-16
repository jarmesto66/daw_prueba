/* Se desea validar hasta qué punto la función Math.random es realmente aleatoria. Para tal fin,
calcularemos 10.000 veces números aleatorios del 1 al 10. Por pantalla mostraremos cada
número del 1 al 10 y a continuación el número de veces que ha salido ese número. Por
ejemplo:
Frecuencias
Número 1: 1016
Número 2: 1019
Número 3: 1059
....
Número 10: 993 */

const frecuencias = [];

for (let i = 0; i < 10; i++) {
  frecuencias.push(0);
}

for (let i = 0; i < 10000; i++) {
    const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
    frecuencias[numeroAleatorio - 1]++;
}

let texto3_2 = "Frecuencias\n";
for (let i = 0; i < frecuencias.length; i++) {
  texto3_2 += `Número ${i + 1}: ${frecuencias[i]}\n`;
}

salida3_2.textContent = texto3_2;