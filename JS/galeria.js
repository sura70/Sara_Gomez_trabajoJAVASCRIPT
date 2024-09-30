/* ****************FILTRO*********** */

// Selección de los elementos del filtro
let filtroBuscar = document.getElementById('filtro-buscar');
let filtroCategoria = document.getElementById('filtro-categoria');
let filtroPrecio = document.getElementById('filtro-precio');

// Selección de los productos
let productos = document.querySelectorAll('.producto');

// Función para filtrar los productos
function filtrarProductos() {
    let buscarSeleccionado = filtroBuscar.value;
    let categoriaSeleccionada = filtroCategoria.value;
    let precioSeleccionado = filtroPrecio.value;

    console.log("Buscar:", buscarSeleccionado);
    console.log("Categoría:", categoriaSeleccionada);
    console.log("Precio:", precioSeleccionado)


    productos.forEach(function(producto) {
        let buscarProducto = producto.getAttribute('data-buscar').split(',');
        let categoriaProducto = producto.getAttribute('data-categoria').split(',');
        let precioProducto = producto.getAttribute('data-precio');

       console.log("Producto:", producto);
       console.log("Data-buscar:", buscarProducto);
       console.log("Data-categoria:", categoriaProducto);
       console.log("Data-precio:", precioProducto);

        // Filtrar por categoría y precioy buscar
        if (
           (categoriaSeleccionada === 'todas' || categoriaProducto.includes(categoriaSeleccionada)) &&
           (precioSeleccionado === 'todos' || precioProducto === precioSeleccionado)&&
           (buscarSeleccionado === 'todas' || buscarProducto.includes(buscarSeleccionado) )
       ) {
           producto.classList.remove('oculto');
       } else {
           producto.classList.add('oculto');
       }
     
    });
} 
   
// Añadir eventos a los filtros
filtroBuscar.addEventListener('change', filtrarProductos);
filtroCategoria.addEventListener('change', filtrarProductos);
filtroPrecio.addEventListener('change', filtrarProductos);


// Filtrar los productos al cargar la página
filtrarProductos(); 



