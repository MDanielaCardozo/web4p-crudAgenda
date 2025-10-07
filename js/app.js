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
const tituloModal = document.getElementById("contactoModalLabel");
const seccionDetalles = document.getElementById("seccionDetalleContacto");
const seccionTablaContactos = document.getElementById("seccionTablaContactos");


let estoyCreando = true;
let inputID = document.getElementById("contactoId");

const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];
console.log(agenda);

const guardarLocalStorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
};

const crearContacto = () => {
  const contactoNuevo = new Contacto(
    (inputID = null),
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
                  <img src=${itemContacto.imagen} alt=${itemContacto.nombre} class="img-thumbnail img-table" width="80px"/>
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
        const celdaIndice = filasRestantes[i].querySelector("th");
        if (celdaIndice) {
          celdaIndice.textContent = i + 1;
        }
      }

      Swal.fire({
        title: "Contacto eliminado",
        text: "El contacto fue eliminado satisfactoriamente",
        icon: "success",
      });
      console.log(agenda);
    }
  });
};

window.prepararContacto = (id) => {

  const contactoBuscado = agenda.find((contacto) => contacto.id === id);

  inputNombre.value = contactoBuscado.nombre;
  inputApellido.value = contactoBuscado.apellido;
  inputEmail.value = contactoBuscado.email;
  inputDireccion.value = contactoBuscado.direccion;
  inputEmpresa.value = contactoBuscado.empresa;
  inputImagen.value = contactoBuscado.imagen;
  inputNotas.value = contactoBuscado.notas;
  inputPuestoTrabajo.value = contactoBuscado.puestoTrabajo;
  inputTelefono.value = contactoBuscado.telefono;
  inputID = id;

  estoyCreando = false;

  modalFormularioContacto.show();
  tituloModal.textContent = "Editar contacto"

};


const editarContacto = () => {

  const indiceContacto = agenda.findIndex((contacto) => contacto.id === inputID);

  agenda[indiceContacto].nombre = inputNombre.value;
  agenda[indiceContacto].apellido = inputApellido.value;
  agenda[indiceContacto].email = inputEmail.value;
  agenda[indiceContacto].telefono = inputTelefono.value;
  agenda[indiceContacto].imagen = inputImagen.value;
  agenda[indiceContacto].empresa = inputEmpresa.value;
  agenda[indiceContacto].puestoTrabajo = inputPuestoTrabajo.value;
  agenda[indiceContacto].direccion = inputDireccion.value;
  agenda[indiceContacto].notas = inputNotas.value;

  //actualizando el localStorage
  guardarLocalStorage();

  //actualizado la fila de la tabla
  const filaEditada = tbody.children[indiceContacto];
  if (filaEditada) {
    filaEditada.children[1].textContent = agenda[indiceContacto].nombre;
    filaEditada.children[2].textContent = agenda[indiceContacto].apellido;
    filaEditada.children[3].textContent = agenda[indiceContacto].telefono;
    filaEditada.children[4].children[0].src = agenda[indiceContacto].nombre;
  }

  modalFormularioContacto.hide();

  Swal.fire({
        title: "Contacto actualizado",
        text: `El contacto ${agenda[indiceContacto].nombre} fue editado satisfactoriamente`,
        icon: "success",
        confirmButtonText : "Ok",
      });

}

window.verDetalleContacto = (id) => {
  const contactoBuscado = agenda.find((contacto) => contacto.id === id);
  console.log(contactoBuscado);
  
};

const mostrarNoHayDisponibles = () => {
  const parrafo = document.createElement("p");
  parrafo.classList.add("text-center");
  parrafo.textContent = "No hay contactos disponibles";
  tabla.appendChild(parrafo);
};

const modalFormularioContacto = new bootstrap.Modal(
  document.getElementById("contactoModal")
);

btnAgregarContacto.addEventListener("click", () => {
  modalFormularioContacto.show();
});

formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  //aqui tengo que crear/editar
  if (estoyCreando) {
    crearContacto();
  } else {
    editarContacto();
  }
  
});

cargarContactos();
