//Agrego un evento q se ejecuta cuando carga el contenido del DOM
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

        //Valido que los campos no sean vacios
        if(nombre === '' || numero === ''){
            alert('Complete los campos, no puede mandar algo vacío.')
            return; //Detengo la ejecución si hay campso vacíos
        } else if(numero >= 0 && numero > 99){
            alert('El numero debe ser mayor o igual a 0 y menor a 99.')
            return;//Lo mismo de antes
        }

        // Crear el objeto de la camiseta personalizada
        var productoPersonalizado = {
            quantity: 1,
            title: `Camiseta River 2024 PERSONALIZADA: ${nombre} #${numero}`,
            price: 80000,
            nombre: nombre,
            numero: numero
        };

        // Guardar en el localStorage
        localStorage.setItem('productoPersonalizado', JSON.stringify(productoPersonalizado));

        // Redirigir a la tienda
        alert('Usted ha añadido una Camiseta Personalizada');
        window.location.href = 'tienda.html';
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