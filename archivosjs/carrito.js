// Función para obtener el estado de la sesión actual
function obtenerSesionActual() {
    return JSON.parse(localStorage.getItem('sesionActual'));
}

// Función para verificar si el usuario está logeado
function usuarioEstaLogeado() {
    var sesion = obtenerSesionActual();
    return sesion !== null;
}

var btnCart = document.querySelector('.container-cart-icon');
var containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});//Al clicker el icono del carrito mustra o oculta los productos del carrito

/* ========================= */
var cartInfo = document.querySelector('.cart-product');
var rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
var productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos, almacena los productos
let allProducts = [];

// Leer el producto personalizado del localStorage si existe
//Almacena el producto personalizado
var productoPersonalizado = localStorage.getItem('productoPersonalizado');
if (productoPersonalizado) {
    productoPersonalizado = JSON.parse(productoPersonalizado);//De cadena JSON a obj JS
    allProducts.push(productoPersonalizado);//Añadimos el producto al carrtio
    //Se quita del localstorage
    localStorage.removeItem('productoPersonalizado');
}

var valorTotal = document.querySelector('.total-pagar');
var countProducts = document.querySelector('#contador-productos');

var cartEmpty = document.querySelector('.cart-empty');
var cartTotal = document.querySelector('.cart-total');

//Al clickear verificamos que el user este logeado
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        if (!usuarioEstaLogeado()) {
            alert('Debe iniciar sesión para añadir productos al carrito.');
            return;
        }

        var product = e.target.parentElement;

        //Obtiene Info del producto
        //Creo objeto
        var infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: parseFloat(product.querySelector('p').textContent.slice(1)),
        };

        var exists = allProducts.some(product => product.title === infoProduct.title);

        //Verifica que exista el producto en el carrito para incrementar la cant o añadirlo al carrito.
        if (exists) {
            var products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        //Actualiza la vista del carrito
        showHTML();
    }
});

//Eliminar producto
rowProduct.addEventListener('click', e => {
    //Al clickear la X se elimina el productoo
    if (e.target.classList.contains('icon-close')) {
        var product = e.target.parentElement;
        var title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(product => product.title !== title);

        showHTML();
    }
});

// Función para mostrar/actualizar HTML
function showHTML() {
    if (!allProducts.length) {//Comprueba si el arreglo no tiene productos
        cartEmpty.classList.remove('hidden');//Si esta vacio va a mostrar el msj
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    // Limpiar HTML
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    //Itera cada producto del array
    allProducts.forEach(product => {
        var containerProduct = document.createElement('div');
        //cREA un div para contener la info del producto
        containerProduct.classList.add('cart-product');
        //Añadae la clase al div creado

        //Creacion html para cada producto
        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">$${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        //se añade el producto al contenedor
        rowProduct.append(containerProduct);

        total += product.quantity * product.price;
        totalOfProducts += product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
}

// Mostrar el HTML inicialmente si hay productos en el carrito
//Actualiza vista del carrito
showHTML();