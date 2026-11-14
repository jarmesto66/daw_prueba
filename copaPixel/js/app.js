const datosIniciales = {
  nombre: "Copa Pixel 2026",
  duracionSegundos: 180,
  participantes: [
    { nombre: "Ryu Master", puntos: 2400, pais: "JP" },
    { nombre: "Lucia Fire", puntos: 3100, pais: "ES" },
    { nombre: "Dragon Kick99", puntos: 1850, pais: "MX" },
    { nombre: "Zero Cool", puntos: 2950, pais: "US" },
  ],
};

const PUNTOS_POR_VOTO = 50;

const CLAVE_STORAGE = "copaPixel.participantes";

// Copia de los datos originales. Se copia cada objeto (no solo el array),
// porque si no compartirían referencia con datosIniciales y el reseteo no funcionaría.
function copiarIniciales() {
  return datosIniciales.participantes.map((p) => ({ ...p }));
}

// ---------- Apartado 3: persistencia ----------

// localStorage solo guarda texto: JSON.stringify al guardar, JSON.parse al leer.
function guardarParticipantes() {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(participantes));
  } catch (error) {
    console.warn("No se pudo guardar en localStorage:", error);
  }
}

// Lee lo guardado; si no hay nada, está corrupto o no encaja con los datos
// de partida, se arranca con los valores originales.
function cargarParticipantes() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE)); // null si no existe
    const valido =
      Array.isArray(guardado) &&
      guardado.length === datosIniciales.participantes.length &&
      guardado.every(
        (g, i) =>
          g &&
          g.nombre === datosIniciales.participantes[i].nombre &&
          Number.isFinite(g.puntos)
      );
    if (valido) return guardado;
  } catch (error) {
    console.warn("Datos guardados ilegibles, se usan los iniciales:", error);
  }
  return copiarIniciales();
}

let participantes = cargarParticipantes();

// Estado de la cuenta atrás
let tiempoRestante = datosIniciales.duracionSegundos;
let intervalo = null;        // id del setInterval; null = no hay cuenta atrás en marcha
let votacionAbierta = false; // permitir votar

const contenedor = document.getElementById("participantes");
const cronometro = document.getElementById("cronometro");
const mensaje = document.getElementById("mensaje");
const btnIniciar = document.getElementById("btn-iniciar");
const btnResetear = document.getElementById("btn-resetear");
document.getElementById("titulo").textContent = datosIniciales.nombre;
document.title = datosIniciales.nombre;

// Crea la tarjeta de un participante. Guardamos su posición en data-indice
// para saber a quién pertenece cada botón.
function crearTarjeta(participante, indice) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";

  const nombre = document.createElement("h2");
  nombre.textContent = participante.nombre;

  const pais = document.createElement("p");
  pais.className = "pais";
  pais.textContent = `País: ${participante.pais}`;

  const puntos = document.createElement("p");
  puntos.className = "puntos";
  puntos.dataset.indice = indice;
  puntos.textContent = participante.puntos;

  const etiqueta = document.createElement("p");
  etiqueta.className = "etiqueta-puntos";
  etiqueta.textContent = "puntos";

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "btn-votar";
  boton.dataset.indice = indice;
  boton.textContent = `Votar (+${PUNTOS_POR_VOTO})`;

  tarjeta.append(nombre, pais, puntos, etiqueta, boton);
  return tarjeta;
}

function pintarParticipantes() {
  contenedor.innerHTML = "";
  participantes.forEach((p, i) => contenedor.appendChild(crearTarjeta(p, i)));
}

// Suma los puntos al modelo y actualiza solo el número afectado en pantalla.
function votar(indice) {
  if (!votacionAbierta) return; // aunque el botón esté deshabilitado
  participantes[indice].puntos += PUNTOS_POR_VOTO;
  guardarParticipantes();
  const celda = contenedor.querySelector(`.puntos[data-indice="${indice}"]`);
  celda.textContent = participantes[indice].puntos;
}

// ---------- Apartado 2: cuenta atrás ----------

// 180 -> "03:00"; 5 -> "00:05"
function formatearTiempo(segundos) {
  const mm = String(Math.floor(segundos / 60)).padStart(2, "0");
  const ss = String(segundos % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

// Habilita/deshabilita todos los botones de voto según el estado
function actualizarBotonesVoto() {
  contenedor.querySelectorAll(".btn-votar").forEach((b) => {
    b.disabled = !votacionAbierta;
  });
}

function pintarCronometro() {
  cronometro.textContent = formatearTiempo(tiempoRestante);
}

function cerrarVotacion() {
  clearInterval(intervalo);
  intervalo = null;
  votacionAbierta = false;
  mensaje.textContent = "¡Votación cerrada!";
  actualizarBotonesVoto();
  // btnIniciar sigue deshabilitado: solo "Resetear torneo" lo reactiva
}

function tic() {
  tiempoRestante--;
  pintarCronometro();
  if (tiempoRestante <= 0) cerrarVotacion();
}

function iniciarTorneo() {
  if (intervalo !== null) return; // ya está en marcha: no se crea un segundo intervalo
  tiempoRestante = datosIniciales.duracionSegundos;
  votacionAbierta = true;
  mensaje.textContent = "";
  btnIniciar.disabled = true;
  pintarCronometro();
  actualizarBotonesVoto();
  intervalo = setInterval(tic, 1000);
}

btnIniciar.addEventListener("click", iniciarTorneo);

// ---------- Apartado 3: resetear ----------
function resetearTorneo() {
  // Parar cualquier cuenta atrás en marcha para no dejar un intervalo huérfano
  clearInterval(intervalo);
  intervalo = null;
  votacionAbierta = false;
  tiempoRestante = datosIniciales.duracionSegundos;

  participantes = copiarIniciales();
  localStorage.removeItem(CLAVE_STORAGE); // vuelve al estado "primera visita"

  mensaje.textContent = "";
  btnIniciar.disabled = false;
  pintarParticipantes();   // recrea las tarjetas, con los botones habilitados por defecto...
  pintarCronometro();
  actualizarBotonesVoto(); // ...así que hay que volver a bloquearlos
}

btnResetear.addEventListener("click", resetearTorneo);

// Delegación de eventos: un único listener en el contenedor en vez de uno por botón.
contenedor.addEventListener("click", (evento) => {
  const boton = evento.target.closest(".btn-votar");
  if (!boton) return;
  votar(Number(boton.dataset.indice));
});

pintarParticipantes();
pintarCronometro();
actualizarBotonesVoto(); // al cargar, nadie puede votar hasta pulsar «Iniciar torneo»
