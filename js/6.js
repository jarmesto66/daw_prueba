const salida6 = document.getElementById('salida6');

let texto6 = "FizzBuzz del 20 al 1:\n\n";

for (let i = 20; i >= 1; i--) {
    let output = "";
    
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    
    if (output === "") {
        output = i;
    }
    
    texto6 += output + " ";
}

salida6.textContent = texto6;