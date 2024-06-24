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
});

/* ========================= */
var cartInfo = document.querySelector('.cart-product');
var rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
var productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

// Leer el producto personalizado del localStorage si existe
var productoPersonalizado = localStorage.getItem('productoPersonalizado');
if (productoPersonalizado) {
    productoPersonalizado = JSON.parse(productoPersonalizado);
    allProducts.push(productoPersonalizado);
    localStorage.removeItem('productoPersonalizado');
}

var valorTotal = document.querySelector('.total-pagar');
var countProducts = document.querySelector('#contador-productos');

var cartEmpty = document.querySelector('.cart-empty');
var cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        if (!usuarioEstaLogeado()) {
            alert('Debe iniciar sesión para añadir productos al carrito.');
            return;
        }

        var product = e.target.parentElement;

        var infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: parseFloat(product.querySelector('p').textContent.slice(1)),
        };

        var exists = allProducts.some(product => product.title === infoProduct.title);

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

        showHTML();
    }
});

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        var product = e.target.parentElement;
        var title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(product => product.title !== title);

        showHTML();
    }
});

// Función para mostrar HTML
function showHTML() {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
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

    allProducts.forEach(product => {
        var containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

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

        rowProduct.append(containerProduct);

        total += product.quantity * product.price;
        totalOfProducts += product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
}

// Mostrar el HTML inicialmente si hay productos en el carrito
showHTML();