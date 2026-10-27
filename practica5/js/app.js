let listaCompra = ["leche", "pan", "huevos"];

function pintarLista() {
  const ul = document.getElementById("lista");
  ul.innerHTML = ""; // vacía el <ul> antes de pintar

  for (const producto of listaCompra) {
    const li = document.createElement("li");
    li.textContent = producto;
    ul.appendChild(li);
  }
}

pintarLista(); // al cargar la página