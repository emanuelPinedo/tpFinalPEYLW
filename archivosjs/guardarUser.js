document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formulario');

    form.addEventListener('submit', function(event) {
        // Llama a la función de registro y previene el envío si la validación falla
        if (validar()) {
            if (!guardarUser()) {
                event.preventDefault();
            }
        } else {
            event.preventDefault();
        }
    });
});

function validar() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var email = document.getElementById('email').value;
    var contra = document.getElementById('password').value;

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

    if (validarCampos) {
        if (verificarUser(email)) {
            alert('Este Email ya está en uso.');
            return false;
        }
        alert('Datos Correctos. Cuenta Creada.');
        guardarUser();
        return true;
    } else {
        return false;
    }
}

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
    var nombreInput = document.getElementById('nombre');
    var apellidoInput = document.getElementById('apellido');
    var emailInput = document.getElementById('email');
    var contraseniaInput = document.getElementById('password');
    var nombre = nombreInput.value.trim();
    var apellido = apellidoInput.value.trim();
    var email = emailInput.value.trim();
    var password = contraseniaInput.value.trim();

    if (!verificarUser(nombre)) {
        var usuario = {
            nombre: nombre,
            apellido: apellido,
            password: password,
            email: email
        };
        setEntry('iduser' + nombre, usuario);
        window.location.href = 'iniciarSesion.html';
    }
}

function setEntry(key, valor) {
    localStorage.setItem(key, JSON.stringify(valor));
}

function verificarUser(email) {
    // Verificar si el email existe
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        var usuario = JSON.parse(localStorage.getItem(clave));
        if (usuario.email === email) {
            return true;
        }
    }
    return false;
}