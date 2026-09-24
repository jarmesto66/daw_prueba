const salida6 = document.getElementById('salida6');

let resultado6 = "FizzBuzz del 20 al 1:\n\n";

for (let i = 20; i >= 1; i--) {
    let salida = "";
    
    if (i % 3 === 0) salida += "Fizz";
    if (i % 5 === 0) salida += "Buzz";
    
    if (salida === "") {
        salida = i;
    }
    
    resultado6 = resultado6 + salida + " ";
}

salida6.textContent = resultado6;