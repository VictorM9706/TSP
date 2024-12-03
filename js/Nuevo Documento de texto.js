// Productos
const productos = [
    { id: 1, nombre: "Producto 1", precio: 25.0, imagen: "images/producto1.jpg" },
    { id: 2, nombre: "Producto 2", precio: 30.0, imagen: "images/producto2.jpg" },
    { id: 3, nombre: "Producto 3", precio: 20.0, imagen: "images/producto3.jpg" },
];

// Carrito
let carrito = [];

// Renderizar productos
const productosContainer = document.getElementById("productosContainer");

productos.forEach((producto) => {
    const productoHTML = `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text"><strong>$${producto.precio.toFixed(2)}</strong></p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                </div>
            </div>
        </div>`;
    productosContainer.innerHTML += productoHTML;
});

// Agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find((p) => p.id === id);
    const itemEnCarrito = carrito.find((item) => item.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    renderizarCarrito();
}

// Renderizar carrito
function renderizarCarrito() {
    const carritoContainer = document.getElementById("carritoContainer");
    const totalCarrito = document.getElementById("totalCarrito");

    carritoContainer.innerHTML = "";
    let total = 0;

    carrito.forEach((item) => {
        total += item.precio * item.cantidad;

        carritoContainer.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>$${item.precio.toFixed(2)}</td>
                <td>${item.cantidad}</td>
                <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">Eliminar</button></td>
            </tr>`;
    });

    totalCarrito.textContent = total.toFixed(2);
}

// Eliminar del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter((item) => item.id !== id);
    renderizarCarrito();
}
