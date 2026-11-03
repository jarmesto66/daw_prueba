/* =========================================================
   APARTADO 1 · Clase Ordenador
   ========================================================= */
class Ordenador {
  // Valores por defecto de la clase (los usa la validación)
  static DEFECTOS = { ram: 4, disco: 512, pulgadas: 17 };

  constructor(marca, modelo, precio, ram = 4, disco = 512, pulgadas = 17) {
    // new.target es la clase con la que se hizo "new": Ordenador o Portatil.
    // Así, un valor inválido en un Portatil recibe los defectos de Portatil.
    const defectos = new.target.DEFECTOS;

    this.marca = marca;
    this.modelo = modelo;
    // Se comprueba con "> 0" (y no "<= 0") para que NaN también caiga al defecto
    this.precio = precio > 0 ? precio : 0;
    this.ram = ram > 0 ? ram : defectos.ram;
    this.disco = disco > 0 ? disco : defectos.disco;
    this.pulgadas = pulgadas > 0 ? pulgadas : defectos.pulgadas;
  }

  toString() {
    return `${this.marca} ${this.modelo} · ${this.ram} GB RAM · ${this.disco} GB · ${this.pulgadas}"`;
  }

  comparar(otro) {
    if (this.precio < otro.precio) return "más barato";
    if (this.precio > otro.precio) return "más caro";
    return "mismo precio";
  }
}

/* =========================================================
   APARTADO 2 · Clase Portatil
   ========================================================= */
class Portatil extends Ordenador {
  static DEFECTOS = { ram: 4, disco: 256, pulgadas: 12, autonomia: 4 };

  constructor(marca, modelo, precio, ram = 4, disco = 256, pulgadas = 12, autonomia = 4) {
    super(marca, modelo, precio, ram, disco, pulgadas);
    this.autonomia = autonomia > 0 ? autonomia : Portatil.DEFECTOS.autonomia;
  }

  toString() {
    return `${super.toString()} · ${this.autonomia} h de autonomía`;
  }
}

/* =========================================================
   APARTADO 4 · Clase Carrito
   ========================================================= */
class Carrito {
  #productos = [];

  agregar(producto) {
    this.#productos.push(producto);
  }

  quitar(indice) {
    if (indice >= 0 && indice < this.#productos.length) {
      this.#productos.splice(indice, 1);
    }
  }

  vaciar() {
    this.#productos = [];
  }

  getProductos() {
    return [...this.#productos]; // copia: desde fuera no se toca el array real
  }

  getCantidad() {
    return this.#productos.length;
  }

  getTotal() {
    return this.#productos.reduce((suma, p) => suma + p.precio, 0);
  }
}

/* =========================================================
   APARTADO 3 · Catálogo
   ========================================================= */
const catalogo = [
  new Ordenador("HP", "Pavilion", 749, 8, 1024, 24),
  new Ordenador("Dell", "OptiPlex", 549),               // RAM 4, disco 512, 17"
  new Ordenador("Lenovo", "ThinkCentre", 679, 16),      // disco 512, 17"
  new Ordenador("Apple", "iMac", 1499, 16, 512, 24),
  new Portatil("Apple", "MacBook Air", 1199, 16, 512, 13, 18),
  new Portatil("Lenovo", "IdeaPad", 399),               // todo por defecto
  new Portatil("ASUS", "Zenbook", 899, 16, 512, 14),    // autonomía 4
  new Portatil("HP", "Pavilion x360", 649, 8, 256, 14, 10)
];

const carrito = new Carrito();

// --- Referencias al DOM ---
const grid = document.getElementById("grid");
const filtro = document.getElementById("filtro");
const btnOrdenar = document.getElementById("btn-ordenar");
const cabeceraCarrito = document.getElementById("cabecera-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const cantidadCarrito = document.getElementById("cantidad-carrito");
const btnVaciar = document.getElementById("btn-vaciar");

// --- Utilidades ---
function crear(etiqueta, clase, texto) {
  const el = document.createElement(etiqueta);
  if (clase) el.className = clase;
  if (texto !== undefined) el.textContent = texto; // textContent: nunca se interpreta como HTML
  return el;
}

function euros(cantidad) {
  return cantidad.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

function pintarCatalogo(productos) {
  grid.innerHTML = "";

  productos.forEach((producto) => {
    const esPortatil = producto instanceof Portatil;

    const tarjeta = crear("article", "tarjeta");
    tarjeta.append(
      crear("span", `etiqueta ${esPortatil ? "portatil" : "sobremesa"}`, esPortatil ? "Portátil" : "Sobremesa"),
      crear("h3", "", `${producto.marca} ${producto.modelo}`),
      crear("p", "detalles", producto.toString())
    );

    const pie = crear("div", "pie");
    const boton = crear("button", "", "Añadir");
    // La flecha recuerda el producto de ESTA tarjeta
    boton.addEventListener("click", () => {
      carrito.agregar(producto);
      pintarCarrito();
    });
    pie.append(crear("span", "precio", euros(producto.precio)), boton);

    tarjeta.append(pie);
    grid.append(tarjeta);
  });
}

/* =========================================================
   APARTADO 5 · Filtrar y ordenar
   ========================================================= */
let ordenado = false;

// Devuelve lo que toca mostrar según el filtro y el orden activos
function productosVisibles() {
  let lista = catalogo;

  if (filtro.value === "sobremesa") {
    // Un portátil también es instanceof Ordenador: hay que excluirlos
    lista = catalogo.filter((p) => !(p instanceof Portatil));
  } else if (filtro.value === "portatil") {
    lista = catalogo.filter((p) => p instanceof Portatil);
  }

  if (ordenado) {
    // Se ordena una copia: el orden de "catalogo" no cambia
    lista = [...lista].sort((a, b) => a.precio - b.precio);
  }

  return lista;
}

function actualizarCatalogo() {
  pintarCatalogo(productosVisibles());
}

filtro.addEventListener("change", actualizarCatalogo);

btnOrdenar.addEventListener("click", () => {
  ordenado = !ordenado;
  btnOrdenar.setAttribute("aria-pressed", String(ordenado));
  actualizarCatalogo();
});

/* =========================================================
   APARTADO 4 (vista) · Pintar el carrito
   ========================================================= */
function pintarCarrito() {
  listaCarrito.innerHTML = "";

  carrito.getProductos().forEach((producto, indice) => {
    const li = crear("li", "item-carrito");
    const quitar = crear("button", "btn-quitar", "Quitar");
    quitar.addEventListener("click", () => {
      carrito.quitar(indice);
      pintarCarrito();
    });

    li.append(
      crear("span", "", `${producto.marca} ${producto.modelo}`),
      crear("span", "", euros(producto.precio)),
      quitar
    );
    listaCarrito.append(li);
  });

  const cantidad = carrito.getCantidad();
  cabeceraCarrito.textContent = `Carrito (${cantidad})`;
  totalCarrito.textContent = euros(carrito.getTotal());

  if (cantidad === 0) {
    cantidadCarrito.textContent = "El carrito está vacío";
  } else if (cantidad === 1) {
    cantidadCarrito.textContent = "1 producto";
  } else {
    cantidadCarrito.textContent = `${cantidad} productos`;
  }
}

btnVaciar.addEventListener("click", () => {
  carrito.vaciar();
  pintarCarrito();
});

/* =========================================================
   APARTADO 6 · Dar de alta productos
   ========================================================= */
const form = document.getElementById("form-producto");
const fTipo = document.getElementById("f-tipo");
const fMarca = document.getElementById("f-marca");
const fModelo = document.getElementById("f-modelo");
const fPrecio = document.getElementById("f-precio");
const fRam = document.getElementById("f-ram");
const fDisco = document.getElementById("f-disco");
const fPulgadas = document.getElementById("f-pulgadas");
const fAutonomia = document.getElementById("f-autonomia");
const campoAutonomia = document.getElementById("campo-autonomia");
const errorForm = document.getElementById("error-form");

// Campo vacío -> undefined (así se aplica el parámetro por defecto);
// si no, se convierte a número
function numeroOUndefined(campo) {
  return campo.value === "" ? undefined : Number(campo.value);
}

// La autonomía solo tiene sentido en portátiles
fTipo.addEventListener("change", () => {
  campoAutonomia.hidden = fTipo.value !== "portatil";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const marca = fMarca.value.trim();
  const modelo = fModelo.value.trim();
  const precio = fPrecio.value === "" ? NaN : Number(fPrecio.value);

  if (marca === "" || modelo === "" || !(precio > 0)) {
    errorForm.textContent = "Rellena marca, modelo y un precio mayor que 0.";
    return;
  }

  const ram = numeroOUndefined(fRam);
  const disco = numeroOUndefined(fDisco);
  const pulgadas = numeroOUndefined(fPulgadas);

  let nuevo;
  if (fTipo.value === "portatil") {
    nuevo = new Portatil(marca, modelo, precio, ram, disco, pulgadas, numeroOUndefined(fAutonomia));
  } else {
    nuevo = new Ordenador(marca, modelo, precio, ram, disco, pulgadas);
  }

  catalogo.push(nuevo);
  actualizarCatalogo(); // respeta el filtro y el orden activos

  errorForm.textContent = "";
  form.reset();
  campoAutonomia.hidden = true; // reset() vuelve el tipo a "sobremesa"
});

/* =========================================================
   Inicio
   ========================================================= */
actualizarCatalogo();
pintarCarrito();
