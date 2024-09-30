//MAPA


const options={
  enableHighAccuracy: true,// calcular la ruta más exacta 
  timeOut: 5000, //el tiempo que tarda en sacar las coordenadas
  maximunAge: 0 //que no almacene en caché y las calcule
}
if(navigator.geolocation){//comprobamos que el dispositivo tenga habilitada la geolocalización
  navigator.geolocation.getCurrentPosition(success, error, options);// con esto le pedimos la posición, le pasamos 3 parámetros, el primero una función que se ejecutará si no hay errores, el segundo una función que se ejecutará si hay errores, y el tercero opciones
}else{
alert("Los servicios de geocalización no están disponible")
}

function success(position){
    let latitud = position.coords.latitude;
    let longitud = position.coords.longitude;

    let map = L.map('map',{
      center:[latitud,longitud],
      zoom:10
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let control = L.Routing.control({
        waypoints:[
          L.latLng(latitud, longitud),
          L.latLng(37.2774167,-6.9370556 )
        ],
        language: 'es',
    }).addTo(map);


}

function error(){
  
}

//FORMULARIO DE CONTACTO

document.addEventListener('DOMContentLoaded', function(){
  const formularioContacto2=document.getElementById("formularioContac");

  formularioContacto2.addEventListener('submit',function(event){
      event.preventDefault();//prevenir el envio del formulario

      //limpiar mensajes de error anteriores
      clearErrors();

  

      //Obtener los valores de los campos
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const nombre= document.getElementById("nombre").value.trim();
      const apellidos = document.getElementById("apellidos").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefono = document.getElementById("telefono").value.trim();





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
      if (isValid) {
                
       
        alert('¡¡Mensaje enviado!!')
    
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
}); 