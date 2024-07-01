//Agrego un evento q se ejecuta cuando carga el contenido del DOM
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formulario');

    form.addEventListener('submit', function(event) { //Se activa cuando se manda el formulario
        event.preventDefault(); // Evita el envío del formulario por defecto

        if (validar()) { //Si todos los campos se validan
            guardarUser(); //Guardo los datos
        }
    });
});

function validar() {
    var nombre = document.getElementById('nombre').value.trim();
    var apellido = document.getElementById('apellido').value.trim();
    var email = document.getElementById('email').value.trim();
    var contra = document.getElementById('password').value.trim();

    var validarCampos = true;

    if (nombre === '' || !validarNombre(nombre)) {
        pintarCampoError('nombre');
        validarCampos = false;
    } else {
        despintarCampoError('nombre');
    }

    if (apellido === '' || !validarApellido(apellido)) {
        pintarCampoError('apellido');
        validarCampos = false;
    } else {
        despintarCampoError('apellido');
    }

    if (email === '' || !validarEmail(email)) {
        pintarCampoError('email');
        validarCampos = false;
    } else {
        despintarCampoError('email');
    }

    if (contra === '') {
        pintarCampoError('password');
        validarCampos = false;
    } else {
        despintarCampoError('password');
    }

    return validarCampos;
}

/*Funciones recicladas del TPO (PINTAR Y VALIDAR) */
function validarEmail(email) {
    var contenidoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return contenidoEmail.test(email);
}

function validarNombre(nombre) {
    var soloLetras = /^[A-Za-zÁáÉéÍíÓóÚúñÑ\s]+$/;
    return soloLetras.test(nombre);
}

function validarApellido(apellido) {
    var soloLetras = /^[A-Za-zÁáÉéÍíÓóÚúñÑ\s]+$/;
    return soloLetras.test(apellido);
}

function pintarCampoError(idDelCampo) {
    var campo = document.getElementById(idDelCampo);
    campo.style.borderColor = 'red';
    campo.style.backgroundColor = '#FDD';
}

function despintarCampoError(idDelCampo) {
    var campo = document.getElementById(idDelCampo);
    campo.style.borderColor = '';
    campo.style.backgroundColor = '';
}

function guardarUser() {
    var nombre = document.getElementById('nombre').value.trim();
    var apellido = document.getElementById('apellido').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();

    //Creo un objeto
    var usuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: password
    };

    if (!verificarUser(email)) {
        var clave = 'iduser' + email;//Clave que usa el email del user
        localStorage.setItem(clave, JSON.stringify(usuario));//Guardo el objeto en el localstorage como cadena JSOn
        alert('Datos Correctos. Cuenta Creada.');
        window.location.href = 'iniciarSesion.html'; //Despues de que se registre lo mando a que se logee
    } else {
        alert('Este Email ya está en uso.');
    }
}

function verificarUser(email) {
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);//Voy a obtener la clave en la posicon del indice
        if (clave.startsWith('iduser')) {//Verifico qu e la clave empiece con "iduser"
            var usuario = JSON.parse(localStorage.getItem(clave));//Convierte el objeto de JSON a un objeto Js
            if (usuario.email === email) {//Comparo emails
                return true;
            }
        }
    }
    return false;
}