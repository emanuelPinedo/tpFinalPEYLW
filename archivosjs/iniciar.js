//Agrego un evento q se ejecuta cuando carga el contenido del DOm
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formulario');

    form.addEventListener('submit', function(event) { //Se activa cuando se manda el formulario
        event.preventDefault(); // Evita el envío del formulario por defecto

        if (validar()) { //Si todo se valida
            iniciarSesion();//Inicia la sesion
        }
    });
});

function validar() {//Validacion de email y contra
    var email = document.getElementById('email').value.trim();
    var contra = document.getElementById('password').value.trim();

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

    return validarCampos;
}

/*Funciones recicladas del TPO (PINTAR Y VALIDAR) */
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
    var clave = 'iduser' + email;//Creo la calve con el mail
    var usuarioJSON = localStorage.getItem(clave);//Obtengo el user desde el localstorage

    if (usuarioJSON) {//Entra si existe el user
        var usuario = JSON.parse(usuarioJSON);//Lo convierte a obj JS

        if (usuario.password === password) {//Comparacion de contra ingresada con la del local
            var sesionActual = {
                email: email,
                password: password
            };
            localStorage.setItem('sesionActual', JSON.stringify(sesionActual));//Guardo la sesion en el lcaol
            alert('Inicio de sesión exitoso');
            window.location.href = 'tienda.html'; //Cuando logea lo mando a la tienda.
        } else {
            alert('Contraseña incorrecta');
        }
    } else {
        alert('Email no encontrado');
    }
}