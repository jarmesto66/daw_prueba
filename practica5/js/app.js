let listaCompra = ['leche', 'pan', 'huevos'];

const inputProducto = document.getElementById('input-producto');
const btnAgregar = document.getElementById('btn-agregar');
const btnEliminar = document.getElementById('btn-eliminar');
const contador = document.getElementById('contador');
const buscador = document.getElementById('buscador');
const btnOrdenar = document.getElementById('btn-ordenar');

function pintarLista(lista = listaCompra) {
  const ul = document.getElementById('lista');
  ul.innerHTML = '';

  lista.forEach((producto) => {
    const li = document.createElement('li');
    li.textContent = producto;
    li.dataset.index = listaCompra.indexOf(producto); // índice en el array original
    ul.appendChild(li);
  });

  actualizarContador();
}

function agregarProducto() {
  const texto = inputProducto.value.trim();
  if (texto === "") return;

  // 6.2: comparar en minúsculas para que "Leche" y "leche" cuenten como repetidos
  const repetido = listaCompra.some(
    (producto) => producto.toLowerCase() === texto.toLowerCase()
  );

  if (repetido) {
    alert(`"${texto}" ya está en la lista`);
    return; // no vaciamos el campo: el usuario ve qué escribió
  }

  listaCompra.push(texto);
  inputProducto.value = "";
  buscar(); // repinta respetando el filtro activo
}

function eliminarUltimo() {
  listaCompra.pop();
  pintarLista();
}

function actualizarContador() {
  const total = listaCompra.length;

  if (total === 0) {
    contador.textContent = 'La lista está vacía';
  } else if (total === 1) {
    contador.textContent = 'Tienes 1 producto en la lista';
  } else {
    contador.textContent = `Tienes ${total} productos en la lista`;
  }
}

function buscar() {
  const texto = buscador.value.trim().toLowerCase();

  // Buscador vacío: se muestran todos
  if (texto === '') {
    pintarLista();
    return;
  }

  function eliminarProducto(event) {
    const li = event.target.closest('li');
    if (!li) return;

    listaCompra.splice(Number(li.dataset.index), 1);
    buscar();
  }

  const filtrados = listaCompra.filter((producto) =>
    producto.toLowerCase().includes(texto),
  );
  pintarLista(filtrados);
}

btnAgregar.addEventListener('click', agregarProducto);
btnEliminar.addEventListener('click', eliminarUltimo);

buscador.addEventListener('input', buscar);
document.getElementById('lista').addEventListener('click', eliminarProducto);
document.getElementById("btn-agregar").addEventListener("click", agregarProducto);

inputProducto.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    agregarProducto();
  }
});

// 6.3: ordenar alfabéticamente
document.getElementById("btn-ordenar").addEventListener("click", () => {
  listaCompra.sort((a, b) => a.localeCompare(b, "es"));
  buscar();
});