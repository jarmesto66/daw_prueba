const salida1 = document.getElementById('salida1');

// Declaración inicial
var nombreVar = "Valor var inicial";
let nombreLet = "Valor let inicial";
const nombreConst = "Valor const inicial";

let texto1 = "=== VALORES INICIALES ===\n";
texto1 += `var nombreVar: ${nombreVar}\n`;
texto1 += `let nombreLet: ${nombreLet}\n`;
texto1 += `const nombreConst: ${nombreConst}\n\n`;

// Reasignación
nombreVar = "Valor var reasignado";
nombreLet = "Valor let reasignado";
// nombreConst = "Esto causa error";

texto1 += "=== DESPUÉS DE REASIGNAR ===\n";
texto1 += `var nombreVar: ${nombreVar}\n`;
texto1 += `let nombreLet: ${nombreLet}\n`;
texto1 += `const nombreConst: ${nombreConst} (no se puede reasignar)\n\n`;

// Intento de redeclaración
var nombreVar = "var redeclarada"; // Permitido
// let nombreLet = "let redeclarada"; // SyntaxError: Identifier 'nombreLet' has already been declared
// const nombreConst = "const redeclarada"; // SyntaxError

texto1 += "=== DESPUÉS DE REDECLARACIÓN (var) ===\n";
texto1 += `var nombreVar: ${nombreVar} (se puede redeclarar)\n`;
texto1 += `let nombreLet: ${nombreLet} (no se puede redeclarar)\n`;
texto1 += `const nombreConst: ${nombreConst} (no se puede redeclarar)`;

salida1.textContent = texto1;