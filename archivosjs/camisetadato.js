document.addEventListener('DOMContentLoaded', function() {
    var nombreInput = document.getElementById('nombreInput');
    var numeroInput = document.getElementById('numeroInput');
    var slide2 = document.getElementById('s2');
    var form = document.querySelector('.formu');

    // Escuchar el evento input en el campo de nombre
    nombreInput.addEventListener('input', function() {
        updateCamisetaInfo();
    });

    // Escuchar el evento input en el campo de número
    numeroInput.addEventListener('input', function() {
        updateCamisetaInfo();
    });

    // Escuchar el evento submit en el formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío por defecto del formulario
        var nombre = nombreInput.value.trim().toUpperCase();
        var numero = numeroInput.value.trim();
        window.location.href = `tienda.html?nombre=${encodeURIComponent(nombre)}&numero=${encodeURIComponent(numero)}`;
        alert('Usted ha añadido una Camiseta Personalizada')
    });

    // Función para actualizar la información de la camiseta
    function updateCamisetaInfo() {
        var nombre = nombreInput.value.trim().toUpperCase();
        var numero = numeroInput.value.trim();

        var infoNombre = slide2.querySelector('.info .nombre');
        var infoNumero = slide2.querySelector('.info .numero');

        infoNombre.textContent = nombre;
        infoNumero.textContent = numero;
    }
});