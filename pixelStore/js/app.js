/* =========================================================
   DATOS Y PERSISTENCIA (Apartado 3)
   ========================================================= */
const productosIniciales = [
  { nombre: "Teclado mecánico", precio: 79, stock: 5 },
  { nombre: "Ratón gaming", precio: 39, stock: 10 },
  { nombre: "Auriculares inalámbricos", precio: 99, stock: 3 },
  { nombre: "Monitor 4K", precio: 249, stock: 0 }
];

const CLAVE_PRODUCTOS = "pixelstore-productos";
const CLAVE_HISTORIAL = "pixelstore-historial";

function cargarJSON(clave, valorPorDefecto) {
  try {
    const texto = localStorage.getItem(clave);
    return texto === null ? valorPorDefecto : JSON.parse(texto);
  } catch (error) {
    // JSON corrupto o localStorage no disponible: se parte de cero
    return valorPorDefecto;
  }
}

function guardarJSON(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    console.error("No se pudo guardar en localStorage:", error);
  }
}

// El stock actualizado también se guarda: si no, al recargar volvería al inicial
let productos = cargarJSON(CLAVE_PRODUCTOS, productosIniciales);
let historial = cargarJSON(CLAVE_HISTORIAL, []);

// Pedido ya pagado cuyo envío ha fallado (para "Reintentar envío")
let pedidoPagado = null;

/* =========================================================
   REFERENCIAS AL DOM
   ========================================================= */
const form = document.getElementById("form-compra");
const selProducto = document.getElementById("producto");
const inputCantidad = document.getElementById("cantidad");
const inputDireccion = document.getElementById("direccion");
const btnComprar = document.getElementById("btn-comprar");
const btnReintentar = document.getElementById("btn-reintentar");
const resultado = document.getElementById("resultado");
const listaHistorial = document.getElementById("historial");

/* =========================================================
   APARTADO 2 · Los cuatro pasos (cada uno devuelve una promesa)
   ========================================================= */
function esperar(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

// Paso 1 · 1 s · se rechaza si no hay unidades suficientes
function comprobarStock(producto, cantidad) {
  return new Promise(function (resolve, reject) {
    esperar(1000).then(function () {
      if (producto.stock >= cantidad) {
        resolve();
      } else {
        reject(new Error("No hay stock suficiente de " + producto.nombre));
      }
    });
  });
}

// Paso 1 (en paralelo) · 1,5 s · 5 €, o 0 € si el pedido supera los 100 €
function calcularGastosEnvio(importe, direccion) {
  return new Promise(function (resolve, reject) {
    esperar(1500).then(function () {
      if (direccion.trim() === "") {
        reject(new Error("Falta la dirección de envío"));
      } else {
        resolve(importe > 100 ? 0 : 5);
      }
    });
  });
}

// Paso 2 · 1,5 s · nunca se rechaza
function procesarPago(total) {
  return new Promise(function (resolve) {
    esperar(1500).then(function () {
      resolve("Pago de " + total + " € realizado");
    });
  });
}

// Paso 3 · 2 s · falla al azar un 20 % de las veces
function enviarPedido(direccion) {
  return new Promise(function (resolve, reject) {
    esperar(2000).then(function () {
      if (Math.random() < 0.2) {
        reject(new Error("Error durante el envío, inténtelo de nuevo"));
      } else {
        resolve("Pedido enviado a " + direccion);
      }
    });
  });
}

/* =========================================================
   ESTADO DE CADA PASO EN PANTALLA
   ========================================================= */
const TEXTO_ESTADO = {
  "pendiente": "Pendiente",
  "en-curso": "En curso…",
  "completado": "Completado",
  "error": "Error"
};

function marcarPaso(id, estado) {
  const li = document.querySelector('[data-paso="' + id + '"]');
  li.className = "paso " + estado;
  li.querySelector(".estado").textContent = TEXTO_ESTADO[estado];
}

function reiniciarPasos() {
  ["stock", "envio", "pago", "enviado"].forEach(function (id) {
    marcarPaso(id, "pendiente");
  });
  mostrarResultado("", false);
}

function mostrarResultado(texto, esError) {
  resultado.textContent = texto;
  resultado.className = "resultado " + (texto === "" ? "" : esError ? "fallo" : "ok");
}

// Refleja el estado de una promesa y deja pasar su valor o su error intactos
function seguirPaso(id, promesa) {
  marcarPaso(id, "en-curso");
  return promesa.then(
    function (valor) {
      marcarPaso(id, "completado");
      return valor;
    },
    function (error) {
      marcarPaso(id, "error");
      throw error; // sigue hacia el catch de quien llamó
    }
  );
}

/* =========================================================
   APARTADO 2 · Orquestación con async / await
   Devuelve true si el pedido se completó, false si falló
   ========================================================= */
async function realizarCompra(producto, cantidad, direccion) {
  const importe = producto.precio * cantidad;
  pedidoPagado = null;

  try {
    // Stock y envío no dependen entre sí: a la vez. Si uno se rechaza, Promise.all también
    const resultados = await Promise.all([
      seguirPaso("stock", comprobarStock(producto, cantidad)),
      seguirPaso("envio", calcularGastosEnvio(importe, direccion))
    ]);
    const gastos = resultados[1];

    const mensajePago = await seguirPaso("pago", procesarPago(importe + gastos));

    // A partir de aquí el cliente ya ha pagado: si falla el envío se podrá reintentar
    pedidoPagado = { producto: producto, cantidad: cantidad, direccion: direccion };

    const mensajeEnvio = await seguirPaso("enviado", enviarPedido(direccion));

    pedidoPagado = null;
    mostrarResultado(mensajePago + ". " + mensajeEnvio, false);
    return true;
  } catch (error) {
    mostrarResultado(error.message, true);
    return false;
  }
}

/* =========================================================
   APARTADO 1 · Desplegable
   ========================================================= */
function pintarDesplegable() {
  const seleccionado = selProducto.value; // para conservar la elección al repintar
  selProducto.innerHTML = "";

  productos.forEach(function (producto, indice) {
    const opcion = document.createElement("option");
    opcion.value = indice;
    opcion.textContent = producto.nombre + " (" + producto.stock + " en stock)";
    selProducto.append(opcion);
  });

  if (seleccionado !== "") {
    selProducto.value = seleccionado;
  }
}

/* =========================================================
   APARTADO 3 · Stock e historial
   ========================================================= */
function pintarHistorial() {
  listaHistorial.innerHTML = "";

  if (historial.length === 0) {
    const vacio = document.createElement("li");
    vacio.className = "vacio";
    vacio.textContent = "Todavía no hay pedidos completados";
    listaHistorial.append(vacio);
    return;
  }

  historial.forEach(function (pedido) {
    const li = document.createElement("li");

    const fecha = document.createElement("span");
    fecha.className = "fecha";
    fecha.textContent = new Date(pedido.fecha).toLocaleString("es-ES");

    const detalle = document.createElement("span");
    detalle.textContent = pedido.producto + " × " + pedido.cantidad;

    const direccion = document.createElement("span");
    direccion.className = "direccion";
    direccion.textContent = pedido.direccion;

    li.append(fecha, detalle, direccion);
    listaHistorial.append(li);
  });
}

// Solo se llama cuando el pedido se ha completado
function registrarPedido(producto, cantidad, direccion) {
  producto.stock -= cantidad;

  historial.unshift({
    fecha: new Date().toISOString(), // ISO: se guarda sin ambigüedad y se formatea al pintar
    producto: producto.nombre,
    cantidad: cantidad,
    direccion: direccion
  });

  guardarJSON(CLAVE_PRODUCTOS, productos);
  guardarJSON(CLAVE_HISTORIAL, historial);
  pintarDesplegable();
  pintarHistorial();
}

/* =========================================================
   EVENTOS
   ========================================================= */
form.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const producto = productos[Number(selProducto.value)];
  const cantidad = Number(inputCantidad.value);
  const direccion = inputDireccion.value;

  // Con -3 o vacío, "stock >= cantidad" sería true y el pedido "pasaría"
  if (!Number.isInteger(cantidad) || cantidad < 1) {
    mostrarResultado("La cantidad debe ser un número entero mayor que 0", true);
    return;
  }

  reiniciarPasos();
  btnReintentar.hidden = true;
  btnComprar.disabled = true;

  try {
    const completado = await realizarCompra(producto, cantidad, direccion);

    if (completado) {
      registrarPedido(producto, cantidad, direccion);
    } else if (pedidoPagado !== null) {
      btnReintentar.hidden = false; // falló solo el envío
    }
  } finally {
    // finally: el botón se reactiva haya ido bien o mal
    btnComprar.disabled = false;
  }
});

// Mejora: repite solo el paso 3, sin volver a comprobar stock ni cobrar
btnReintentar.addEventListener("click", async function () {
  if (pedidoPagado === null) return;

  const pedido = pedidoPagado;
  btnReintentar.hidden = true;
  btnComprar.disabled = true;
  mostrarResultado("", false);

  try {
    const mensaje = await seguirPaso("enviado", enviarPedido(pedido.direccion));
    mostrarResultado(mensaje, false);
    registrarPedido(pedido.producto, pedido.cantidad, pedido.direccion);
    pedidoPagado = null;
  } catch (error) {
    mostrarResultado(error.message, true);
    btnReintentar.hidden = false;
  } finally {
    btnComprar.disabled = false;
  }
});

/* =========================================================
   INICIO
   ========================================================= */
pintarDesplegable();
pintarHistorial();
