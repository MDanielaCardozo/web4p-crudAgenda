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
const tbody = document.getElementById("tablaContactosBody");
const tabla = document.querySelector(".table-responsive");
const seccionDetalles = document.getElementById("seccionDetalleContacto");
const seccionTablaContactos = document.getElementById("seccionTablaContactos");

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

  dibujarFila(contactoNuevo, agenda.length);
};

function limpiarFormulario() {
  formularioContacto.reset();
}

const cargarContactos = () => {
  if (agenda.length !== 0) {
    agenda.map((itemContacto, indice) => dibujarFila(itemContacto, indice + 1));
  } else {
    mostrarNoHayDisponibles();
  }
};

const dibujarFila = (itemContacto, fila) => {
  if (tabla.children.length === 2) {
    tabla.children[1].remove();
  }

  tbody.innerHTML += `
  <tr>
                <th scope="row">${fila}</th>
                <td>${itemContacto.nombre}</td>
                <td>${itemContacto.apellido}</td>
                <td>${itemContacto.telefono}</td>
                <td>
                  <img src=${itemContacto.imagen} alt=${itemContacto.nombre} class="img-thumbnail img-table" w-100/>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-info btn-sm me-2 btn-ver-detalle"
                    onclick="verDetalle('${itemContacto.id}')"
                  >
                    <i class="bi bi-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning btn-sm me-2 btn-editar"
                    onclick="prepararContacto('${itemContacto.id}')"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm me-2 btn-borrar"
                    onclick="borrarContacto('${itemContacto.id}')"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
  `;
};


window.borrarContacto = (id) => {
  Swal.fire({
  title: "Estas seguro de eliminar el contacto?",
  text: "No podes revertir este paso",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Borrar",
  cancelButtonText: "Cancelar",
}).then((result) => {
  console.log(result);
  
  if (result.isConfirmed) {

    //bucar la posicion del elemento que quiero borrar
    const indiceContacto = agenda.findIndex((contacto) => contacto.id === id);
    //borrar un contacto del array agenda
    agenda.splice(indiceContacto, 1);

    guardarLocalStorage();

    tbody.children[indiceContacto].remove();

    if (tbody.children.length === 0) {
      mostrarNoHayDisponibles();
    }

    const filasRestantes = tbody.children;

    for (let i = 0; i < filasRestantes.length; i++) {
      const celdaIndice = filasRestantes[i].querySelector('th');
      if (celdaIndice) {
        celdaIndice.textContent = i + 1;
      }
      
    }

    Swal.fire({
      title: "Contacto eliminado",
      text: "El contacto fue eliminado satisfactoriamente",
      icon: "success"
    });
    console.log(agenda);
    
  }
});
}

window.prepararContacto = (id) => {

}

window.verDetalleContacto = (id) => {

}

const mostrarNoHayDisponibles = () => {
  const parrafo = document.createElement("p");
  parrafo.classList.add('text-center');
  parrafo.textContent = "No hay contactos disponibles";
  tabla.appendChild(parrafo);
}

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

cargarContactos();