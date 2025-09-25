import Contacto from "./contacto.js";

const btnAgregarContacto = document.getElementById('btnAgregarContacto');
console.log(btnAgregarContacto);

const modalFormularioContacto = new bootstrap.Modal(document.getElementById('contactoModal'));

btnAgregarContacto.addEventListener('click', () => {
    modalFormularioContacto.show();
})