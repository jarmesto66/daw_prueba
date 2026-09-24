const salida3 = document.getElementById('salida3');

let resultado3 = '';

var mensaje = 'Hola';
resultado3 = resultado3 + 'Global var: ' + mensaje + '\n';

if (true) {
  let mensaje = 'Adios';
  resultado3 = resultado3 + 'Dentro if let: ' + mensaje + '\n';
}

resultado3 = resultado3 + 'Despues if: ' + mensaje + '\n';
resultado3 = resultado3 + 'No son iguales porque let tiene su propio scope\n\n';

let mensaje2 = 'Hola';
resultado3 = resultado3 + 'Global let: ' + mensaje2 + '\n';

if (true) {
  let mensaje2 = 'Adios';
  resultado3 = resultado3 + 'Dentro if let: ' + mensaje2 + '\n';
}

resultado3 = resultado3 + 'Despues if: ' + mensaje2 + '\n';
resultado3 = resultado3 + 'Tampoco son iguales, let siempre respeta scope\n\n';

var mensaje3 = 'Hola';
resultado3 = resultado3 + 'Global var: ' + mensaje3 + '\n';

if (true) {
  var mensaje3 = 'Adios';
  resultado3 = resultado3 + 'Dentro if var: ' + mensaje3 + '\n';
}

resultado3 = resultado3 + 'Despues if: ' + mensaje3 + '\n';
resultado3 = resultado3 + 'Con var SÍ cambia porque var no respeta scope';

salida3.textContent = resultado3;
