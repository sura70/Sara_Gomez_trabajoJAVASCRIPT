/* funcionalidad general de las páginas */

/* ****************CARRITO DE LA COMPRA************************ */

document.addEventListener('DOMContentLoaded', () => {
    // Obtener los elementos del DOM
    const modal = document.getElementById('cartModal');
    const closeModal = document.getElementById('closeModal');
    const cartButton = document.getElementById('cuentaCarrito');
    const mainContent = document.getElementById('productosCata');
    const mainContent1 =document.getElementById('productosCata1');
    const footer=document.getElementById('foo');
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
  
    // Obtener carrito de localStorage o inicializarlo como vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Función para actualizar el contador del carrito en el botón
    function updateCartCount() {
      const totalItems = cart.reduce((total, item) => total + 1, 0);
      cartButton.textContent = `(${totalItems})`;
      /* cartButton.textContent = `(${cart.length})`; */
      
    }
  
    // Función para guardar el carrito en localStorage
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
  
    // Función para abrir el modal y mover el contenido
    function openModal() {
      modal.style.display = 'block';
      mainContent.classList.add('content-move-left'); // Mover el contenido hacia la izquierda
      mainContent1.classList.add('content-move-left')
      footer.classList.add('content-move-left')
      renderCartItems(); // Mostrar elementos del carrito en el modal
    }
  
    // Función para cerrar el modal y restaurar el contenido
    function closeModalFunction() {
      modal.style.display = 'none';
      mainContent.classList.remove('content-move-left'); // Restaurar el contenido a la posición original
      mainContent1.classList.remove('content-move-left');
      footer.classList.remove('content-move-left');
    }
  
      
  
    // Función para renderizar los elementos del carrito en el modal
    function renderCartItems() {
      cartItemsContainer.innerHTML = ''; // Limpiar contenido anterior
      let total = 0;
  
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
      } else {
        cart.forEach((item, index) => {
          const itemElement = document.createElement('div');
          itemElement.classList.add("contenidoModal")
          itemElement.innerHTML = `<span class="pa6">${item.nombre} - ${item.precio} €</span>`;
          
          
          // Botón para eliminar elementos del carrito
          const removeButton = document.createElement('button');
          removeButton.textContent = 'X';
          removeButton.addEventListener('click', () => {
            removeFromCart(index);
          });
  
          itemElement.appendChild(removeButton);
          cartItemsContainer.appendChild(itemElement);
  
          total += item.precio;
        });
        
     
      }
  
      totalPriceElement.textContent = total.toFixed(2); // Actualizar el total en el modal
    }
    
  
    // Función para añadir un producto al carrito
    function addToCart(product) {
      cart.push(product);
      saveCart(); // Guardar el carrito actualizado en localStorage
      updateCartCount(); // Actualizar el contador del carrito
      renderCartItems()
    }
  
  
    // Función para eliminar un producto del carrito
    function removeFromCart(index) {
      cart.splice(index, 1); // Eliminar el producto del array
      saveCart(); // Guardar el carrito actualizado en localStorage
      renderCartItems(); // Volver a mostrar el carrito
      updateCartCount(); // Actualizar el contador del carrito
    }
  
    // Asignar evento a cada botón "Añadir al carrito"
    document.querySelectorAll('.producto').forEach(button => {
      button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.boton2');
        const nombre = productElement.getAttribute('data-nombre');
        const precio = parseFloat(productElement.getAttribute('data-precio1'));
        const product = { nombre, precio };
  
        addToCart(product);
      });
    });
  
    // Eventos para abrir y cerrar el modal
    cartButton.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalFunction);
  
    // Inicializar el contador del carrito al cargar la página
    renderCartItems();
    updateCartCount();
  });
   //Botón para tramitar pedido
   const tramitarPedido = document.getElementById("nuevaCompra");
   tramitarPedido.addEventListener("click", ()=>{
     //redirigir a la pagina de presupuesto
  
    const rutaPresupuesto = "/views/presupuesto.html";
    const rutaActual = window.location.pathname;
    let rutaCompleta;
    if (rutaActual.includes("/views/views_catalogo/")){
      rutaCompleta="../.." + rutaPresupuesto;
    }else if(rutaActual.includes("/views/")){
      rutaCompleta= "../" + rutaPresupuesto;
    }else{
      rutaCompleta ="./" + rutaPresupuesto;
    }
    window.location.href = rutaCompleta;
     
   });
   


   // Elementos del footer
   document.addEventListener('DOMContentLoaded', function(){

    const formulario=document.getElementById("formu");
    formulario.addEventListener('submit',function(event){
        event.preventDefault();//prevenir el envio del formulario
    
        clearErrors();
    
    const email1= document.getElementById("email1").value.trim();
    const politica =document.getElementById("check").checked;
    
    
    
    let isValid=true;
    
    if (email1 === "") {
        showError('email1Error', 'El email es obligatorio.');
        isValid = false;
    } else if (!validateEmail(email1)) {
        showError('email1Error', 'El email no es válido.');
        isValid = false;
    }
    if(!politica){
        showError('checkError1', 'Debes de aceptar la politica de privacidad')
        isValid=false;
    }
    
    
    
     if(isValid){
    
      alert("Te has suscrito");
     }
    
    });
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    // Función para limpiar errores
    function clearErrors() {
    const errors = document.getElementsByClassName('error');
    for (let i = 0; i < errors.length; i++) {
        errors[i].innerText = '';
    }
    }
    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }
    
    });



    /***************************************ENLACES DEL FOOTER **************************************/ 
    document.getElementById('formularioContacto1').addEventListener('click', function(event){
      event.preventDefault();
      window.location.href = "/views/contacto.html#formularioContacto1";
    })
    document.getElementById('aqui').addEventListener('click', function(event){
      event.preventDefault();
      window.location.href="/views/contacto.html#estamosAqui";
    })