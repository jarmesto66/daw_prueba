/* Ejercicio 5.8: Marca todos los inputs cuyo name sea alumnos. */
var alumnos = document.getElementsByName("alumnos");
for (var i = 0; i < alumnos.length; i++) {
    alumnos[i].checked = true;
}