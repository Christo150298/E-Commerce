
let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos= data;
        cargarProductos(productos);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".btn-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");

const actualizarCantidadProductos = () => {
    let cantidadProductos = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = cantidadProductos
};

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarCantidadProductos();
} else { productosEnCarrito = [] }

const agregarAlCarrito = (e) => {

    Toastify({
        text: "Producto Agregado",
        duration: 1500,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #24096e, #877c9b)",
          borderRadius: "0.80rem",
          textTransform: "uppercase",
          fontSize: "0.75rem"
        },
        offset: {
            x: "1.5rem",
            y: "1.5rem"
          },
        onClick: function(){}
      }).showToast();

    const id = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === id);

    if(productosEnCarrito.some(producto => producto.id === id)){
        const index = productosEnCarrito.findIndex(producto => producto.id === id);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarCantidadProductos();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

const actualizarBotonesAgregar = () => {
    botonesAgregar = document.querySelectorAll(".producto-agregar")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};

const cargarProductos = (productosElegidos) => {

    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio} €</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
            `
        contenedorProductos.append(div);

        actualizarBotonesAgregar();
    });
};

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) =>{
        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre

            const productoSeleccionado = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productoSeleccionado)
        } else {
            tituloPrincipal.innerText = "Todos los Productos"
            cargarProductos(productos);
        }
    });
});