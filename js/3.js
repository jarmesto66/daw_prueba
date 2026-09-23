const salida3 = document.getElementById('salida3');

let texto3 = "";

// VARIANTE 1: var global y let local
texto3 += "=== VARIANTE 1: var global + let dentro if ===\n";
var mensaje = "Hola";
texto3 += "Mensaje global (var): " + mensaje + "\n";

if (true) {
    let mensaje = "Adiós";
    texto3 += "Dentro del if (let): " + mensaje + "\n";
}

texto3 += "Después del if: " + mensaje + "\n";
texto3 += "¿Son iguales? No. El let crea un scope local.\n";
texto3 += "La var global sigue siendo 'Hola'\n\n";

// VARIANTE 2: let en ambos casos
texto3 += "=== VARIANTE 2: let global + let dentro if ===\n";
let mensaje2 = "Hola";
texto3 += "Mensaje global (let): " + mensaje2 + "\n";

if (true) {
    let mensaje2 = "Adiós";
    texto3 += "Dentro del if (let): " + mensaje2 + "\n";
}

texto3 += "Después del if: " + mensaje2 + "\n";
texto3 += "¿Cambia algo? No, le let respeta el scope del bloque.\n";
texto3 += "El let global sigue siendo 'Hola'\n\n";

// VARIANTE 3: var en ambos casos
texto3 += "=== VARIANTE 3: var global + var dentro if ===\n";
var mensaje3 = "Hola";
texto3 += "Mensaje global (var): " + mensaje3 + "\n";

if (true) {
    var mensaje3 = "Adiós";
    texto3 += "Dentro del if (var): " + mensaje3 + "\n";
}

texto3 += "Después del if: " + mensaje3 + "\n";
texto3 += "¿Cambia algo? SÍ. La var NO respeta el scope del bloque.\n";
texto3 += "El valor cambia a 'Adiós' en TODA la función.";

salida3.textContent = texto3;