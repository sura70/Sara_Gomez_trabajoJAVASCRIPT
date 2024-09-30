

document.addEventListener('DOMContentLoaded', () => {
    const presupuestoItemsContainer = document.getElementById('presupuestoItems');
    const presupuestoTotalElement = document.getElementById('presupuestoTotal');
    const checkboxes = document.querySelectorAll(".cuadro");
    const marcarTodos = document.getElementById("todos");
   
    const plazoSelect = document.getElementById('plazo'); 
    // Obtener carrito de localStorage o inicializarlo como vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Función para aplicar descuentos
    function aplicarDescuento(precioTotal, plazo) {
        let descuento = 0;
    
        if (plazo === 0) {
            descuento = 0.10; 
            
        } else if (plazo <= 6) {
            descuento = 0.05; 
            
        }else{
            
        }
    
        const precioConDescuento = precioTotal - (precioTotal * descuento);
        return precioConDescuento;
    }
    
    // Función para renderizar los elementos del carrito en la página de presupuesto
    function renderPresupuestoItems() {
        presupuestoItemsContainer.innerHTML = ''; // Limpiar contenido anterior
        let total = 0;
    
        if (cart.length === 0) {
            presupuestoItemsContainer.innerHTML = '<p>No hay productos en su pedido.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add("contenidoPedido")
                itemElement.innerHTML = `<p class="pa5">${item.nombre} - ${item.precio} €</p>`;
    
                // Botón para elimina elementos del presupuesto
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Eliminar';
                removeButton.classList.add("removebutton")
                removeButton.addEventListener('click', () => {
                    removeFromPresupuesto(index);
                });
    
                itemElement.appendChild(removeButton);
                presupuestoItemsContainer.appendChild(itemElement);
    
                total += item.precio;
            });
    
            // Sumar el valor de los extras seleccionados
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    total += parseFloat(checkbox.value);
                }
            });
    
            // Obtener el valor del plazo seleccionado
            const plazo = parseInt(plazoSelect.value);
    
            // Aplicar descuento basado en el plazo seleccionado
            total = aplicarDescuento(total, plazo);
        }
    
        // Mostrar el total actualizado
        presupuestoTotalElement.textContent = total.toFixed(2);
    }
    
    // Función para marcar todos los extras
    function marcarTodosExtras() {
        if (marcarTodos.checked) {
            checkboxes.forEach(check => {
                check.checked = true;
            });
        } else {
            checkboxes.forEach(check => {
                check.checked = false;
            });
        }
        renderPresupuestoItems(); // Volver a calcular el total después de marcar o desmarcar
    }
    
    // Agregar evento para recalcular precio al cambiar el plazo
    plazoSelect.addEventListener("change", renderPresupuestoItems);
    
    // Agregar evento al marcar todos
    marcarTodos.addEventListener("change", marcarTodosExtras);
    
    // Agregar evento a cada checkbox para recalcular precio
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", renderPresupuestoItems);
    });
    
    // Función para eliminar un producto del presupuesto
    function removeFromPresupuesto(index) {
        cart.splice(index, 1); // Eliminar el producto del array
        localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito actualizado en localStorage
        renderPresupuestoItems(); // Volver a mostrar el presupuesto
    }
    
    // Inicializar el renderizado de elementos del presupuesto
    renderPresupuestoItems();
}) 

    ///////////////////////////VALIDAR FORMULARIO Y MOSTRAR MODAL DE METODOS DE PAGO////////////////////////////


    document.addEventListener('DOMContentLoaded', function(){
        const formu=document.getElementById("formulario");
    
        formu.addEventListener('submit',function(event){
            event.preventDefault();//prevenir el envio del formulario
    
            //limpiar mensajes de error anteriores
            clearErrors();
    
        

            //Obtener los valores de los campos
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const nombre= document.getElementById("nombre").value.trim();
            const apellidos = document.getElementById("apellidos").value.trim();
            const email = document.getElementById("email").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const direccion = document.getElementById("direccion").value.trim();
            const pais = document.getElementById("pais").value;
            const provincia = document.getElementById("provincia").value;
            const ciudad=document.getElementById("ciudad").value.trim();
            const codigoPostal = document.getElementById("codigoPostal").value.trim();
            const modal1=document.getElementById('modalPago');
    
            
    
            
    
            let isValid = true;
    
            //Validaciones
            if(nombre===""  ){
                showError('nombreError','El nombre es obligatorio')
                isValid=false;
            }else if (!validateNombre(nombre)){
                showError('nombreError','El nombre no es válido(Sólo se permiten letras y espacios,max 15 carácteres)');
                isValid=false;
            }
            if(apellidos==="" ){
                showError('apellidosError','Los apellidos son obligatorios');
                isValid=false;
            }else if (!validateApellidos(apellidos)){
                showError('apellidosError','Los apellidos no son válidos(Sólo se permiten letras y espacios,max 40 carácteres)');
            }
            if (email === "") {
                showError('emailError', 'El email es obligatorio.');
                isValid = false;
            } else if (!validateEmail(email) ) {
                showError('emailError', 'El email no es válido.');
                isValid = false;
            }
            if (telefono === "") {
                showError('telefonoError', 'El teléfono es obligatorio.');
                isValid = false;
            } else if (!validatePhone(telefono)) {
                showError('telefonoError', 'El teléfono no es válido(Debe tener 9 dígitos).');
                isValid = false;
            }
            if (direccion === "") {
                showError('direccionError', 'La dirección es obligatoria.');
                isValid = false;
            }
            if (pais === "") {
                showError('paisError', 'El país es obligatorio.');
                isValid = false;
            }
            if (provincia === "") {
                showError('provinciaError', 'La provincia es obligatoria.');
                isValid = false;
            }
            if (ciudad === "") {
                showError('ciudadError', 'La ciudad es obligatoria.');
                isValid = false;
            }
    
            if (codigoPostal === "") {
                showError('codigoPostalError', 'El código postal es obligatorio.');
                isValid = false;
            } else if (!validatePostalCode(codigoPostal)) {
                showError('codigoPostalError', 'El código postal no es válido.');
                isValid = false;
            }
           
            const politica =document.getElementById("check").checked;
    
            if(!politica){
                showError('checkError', 'Debes de aceptar la politica de privacidad');
                isValid=false;
            }
            if (cart.length===0){
                showError('pedidoError', 'No hay nada que comprar');
                isValid=false;
            }
                
            // Si todas las validaciones pasan, muestra el modal
           
                if (isValid) {
                
                    modal1.style.display = 'block';
                    
                
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
        function validateNombre(nombre){
            const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,15}$/;
            return nombreRegex.test(nombre);
        }
        function validateApellidos(apellidos){
            const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,40}$/;
            return regex.test(apellidos);
        }
        function validateEmail(email) {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
        }
    
        function validatePhone(phone) {
            const regex = /^[0-9]{9}$/; // Ejemplo para teléfono español de 9 dígitos
            return regex.test(phone);
        }
    
        function validatePostalCode(postalCode) {
            const regex = /^[0-9]{5}$/; // Ejemplo para código postal español de 5 dígitos
            return regex.test(postalCode);
        }
     
    //cerrar modal
    const cerrar = document.getElementById('close')
    cerrar.addEventListener('click', function(){
    const modal1= document.getElementById("modalPago");
       modal1.style.display= 'none';
    })
  
   
    // Función para redirigir al usuario al método de pago seleccionado
    window.irAPagar = function(metodo) {
        let urlPago = '';

        switch (metodo) {
            case 'tarjeta':
                urlPago = 'pagina_pago_tarjeta.html'; // Reemplaza con la URL real
                break;
            case 'paypal':
                urlPago = 'pagina_pago_paypal.html'; // Reemplaza con la URL real
                break;
            case 'transferencia':
                urlPago = 'pagina_pago_transferencia.html'; // Reemplaza con la URL real
                break;
            default:
                alert('Método de pago no válido.');
                return;
        }

        // Redirigir a la página de pago
        window.location.href = urlPago;
    }
    

});


