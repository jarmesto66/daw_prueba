const salida1 = document.getElementById('salida1');

// Declaración inicial
var nombreVar = 'hola';
let nombreLet = 'mundo';
const nombreConst = 'JavaScript';

let resultado1 = '=== VALORES INICIALES ===\n';
resultado1 += `var nombreVar: ${nombreVar}\n`;
resultado1 += `let nombreLet: ${nombreLet}\n`;
resultado1 += `const nombreConst: ${nombreConst}\n\n`;

// Reasignación
nombreVar = 'Valor var cambiado';
nombreLet = 'Valor let cambiado';
// nombreConst = "Esto causaría error";

resultado1 += '=== DESPUÉS DE CAMBIAR:\n';
resultado1 = resultado1 + 'var: ' + nombreVar + '\n';
resultado1 = resultado1 + 'let: ' + nombreLet + '\n';
resultado1 = resultado1 + 'const: ' + nombreConst + '\n';

// Intento de redeclaración
var nombreVar = 'var redeclarada'; // Permitido
// let nombreLet = "let redeclarada"; // SyntaxError: Identifier 'nombreLet' has already been declared
// const nombreConst = "const redeclarada"; // SyntaxError

resultado1 += '=== DESPUÉS DE CAMBIAR (var) ===\n';
resultado1 += `var nombreVar: ${nombreVar} (se puede redeclarar)\n`;
resultado1 += `let nombreLet: ${nombreLet} (no se puede redeclarar)\n`;
resultado1 += `const nombreConst: ${nombreConst} (no se puede redeclarar)`;

salida1.textContent = resultado1;
