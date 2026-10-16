/* Mostrar por pantalla 50 combinaciones aleatorias de la lotería primitiva. Las combinaciones
son 6 números del 1 al 49, pero debe tenerse en cuenta que no se pueden repetir los números
en una misma combinación. */

const apuesta = [];
const combinaciones = 50;

for (let i = 0; i < combinaciones; i++) {
    const numeros = new Set();
    while (numeros.size < 6) {
        const numeroAleatorio = Math.floor(Math.random() * 49) + 1;
        numeros.add(numeroAleatorio);
    }
    apuesta.push(Array.from(numeros).sort((a, b) => a - b));
}
console.log(apuesta);

let texto = "";

for (let i = 0; i < apuesta.length; i++) {
  texto = texto + apuesta[i].join(', ');
  if (i < apuesta.length - 1) {
    texto = texto + '\n';
  }
}

salida3_1.textContent = texto;