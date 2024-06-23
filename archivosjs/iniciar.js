document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formulario');

    form.addEventListener('submit', function(event) {
        // Llama a la función de registro y previene el envío si la validación falla
        if (validar()) {
            if (!iniciarSesion()) {
                event.preventDefault();
            }
        } else {
            event.preventDefault();
        }
    });
});

function validar() {
    var email = document.getElementById('email').value;
    var contra = document.getElementById('password').value;

    var validarCampos = true;

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
        alert('Todos los datos son correctos.');
        return true;
    } else {
        return false;
    }
}

function validarEmail(email) {
    var contenidoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return contenidoEmail.test(email);
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

function iniciarSesion() {
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var clave = 'iduser' + email;
    var usuarioJSON = localStorage.getItem(clave);

    if (usuarioJSON) {
        var usuario = JSON.parse(usuarioJSON);

        if (usuario.password === password) {
            //guardo la sesion del user
            var sesionActual = {
                email: email,
                password: password
            }
            localStorage.setItem('sesionActual', JSON.stringify(sesionActual));

            alert('Inicio de sesión realizado');
            return true;
        } else {
            alert('Email o contraseña incorrectos');
            return false;
        }
    } else {
        alert('Email no encontrado');
        return false;
    }
}