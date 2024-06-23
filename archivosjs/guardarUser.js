document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formulario');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        if (validar()) {
            guardarUser();
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

    var usuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: password
    };

    if (!verificarUser(email)) {
        var clave = 'iduser' + email;
        localStorage.setItem(clave, JSON.stringify(usuario));
        alert('Datos Correctos. Cuenta Creada.');
        window.location.href = 'iniciarSesion.html'; //Despues de que se registre lo mando a que se logee
    } else {
        alert('Este Email ya está en uso.');
    }
}

function verificarUser(email) {
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        if (clave.startsWith('iduser')) {
            var usuario = JSON.parse(localStorage.getItem(clave));
            if (usuario.email === email) {
                return true;
            }
        }
    }
    return false;
}