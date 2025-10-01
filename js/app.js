import Contacto from "./contacto.js";

const btnAgregarContacto = document.getElementById("btnAgregarContacto");
console.log(btnAgregarContacto);
const formularioContacto = document.getElementById("formContacto");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputEmail = document.getElementById("email");
const inputTelefono = document.getElementById("telefono");
const inputDireccion = document.getElementById("direccion");
const inputNotas = document.getElementById("notas");
const inputImagen = document.getElementById("imagen");
const inputPuestoTrabajo = document.getElementById("puestoTrabajo");
const inputEmpresa = document.getElementById("empresa");

let inputID = document.getElementById("contactoId");

const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];
console.log(agenda);

const guardarLocalStorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
};

const crearContacto = () => {
  const contactoNuevo = new Contacto(
    inputID = null,
    inputNombre.value,
    inputApellido.value,
    inputTelefono.value,
    inputEmail.value,
    inputImagen.value.length !== 0
      ? inputImagen.value
      : "https://images.pexels.com/photos/28216688/pexels-photo-28216688.png",
    inputEmpresa.value,
    inputPuestoTrabajo.value,
    inputDireccion.value,
    inputNotas.value
  );

  agenda.push(contactoNuevo);
  console.log(contactoNuevo);

  guardarLocalStorage();

  Swal.fire({
    title: "Contacto creado",
    text: `El contacto ${inputNombre.value} fue creado correctamente.`,
    icon: "success",
    confirmButtonText: "OK",
  });

  limpiarFormulario();

  dibujarFila();

  
};

function limpiarFormulario() {
  formularioContacto.reset();
}

const dibujarFila = () => {
 
                
};

const modalFormularioContacto = new bootstrap.Modal(
  document.getElementById("contactoModal")
);

btnAgregarContacto.addEventListener("click", () => {
  modalFormularioContacto.show();
});

formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();

  crearContacto();
});
