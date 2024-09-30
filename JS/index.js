
//section1!!!

const seccion1=document.getElementById("sect1");//apuntamos a la sección uno
let row1=document.createElement("div");//creamos un div con la clase row
row1.classList.add("row")//añadimos la clase row
let col1= document.createElement("div");//creamos un div1 con la clase col
col1.classList.add("col-lg-6");//añadimos la clase col
let texto= document.createElement("h4");//creamos un párrafo
texto.classList.add("par");//añadimos una clase al p
texto.innerHTML=("<b>¿Crees que puedes vencerlos a todos y quedar ganador?</b> juega a <b class='b1'><a href='./views/views_catalogo/the_island.html'>THE ISLAND!</a></b>")//añadimos texto al párrafo
col1.appendChild(texto);//añadimos el párrafo al div
let col2= document.createElement("div");//creamos un div2 con la clase col 
col2.classList.add("col-lg-3");//añadimos la clase col
let enlace= document.createElement("a");
enlace.classList.add("link")
enlace.href="./views/views_catalogo/the_island.html";
let foto1=document.createElement("img");//creamos una imagen
foto1.classList.add("foto1")
foto1.src="./assets/images/producto8.jpg"//añadimos la url de la imagen
foto1.alt="island"
enlace.appendChild(foto1)
col2.appendChild(enlace)
let col3= document.createElement("div");//creamos un div3 con la clase col
col3.classList.add("col-lg-3");//añadimos la clase col
let boton=document.createElement("button");//creamos un botón
boton.classList.add("btn1");//le damos una clase
boton.innerHTML= "<a href='./views/views_catalogo/the_island.html'>comprar</a>";//añadimos texto al botón
col3.appendChild(boton);//añadimos el botón al div
row1.appendChild(col1);
row1.appendChild(col2);
row1.appendChild(col3);
seccion1.appendChild(row1);

//section 2!!!

//CARGAMOS EL ARCHIVO JSON
document.addEventListener("DOMContentLoaded",function(){
    fetch('noticias.json')
        .then(response => response.json())
        .then(data => mostrarNoticias(data))
        .catch(error => console.error('Error al cargar las noticias:', error));
});

function mostrarNoticias(noticias){
    const contenedorNoticias = document.getElementById("noticias");
    noticias.forEach(noticia => {
        const noticiaDiv = document.createElement("div");
        noticiaDiv.classList.add('noticia');

        const titulo = document.createElement("h2");
        titulo.textContent = noticia.titulo;

        const contenido = document.createElement("p");
        contenido.textContent = noticia.contenido;

        const fecha = document.createElement("p")
        fecha.textContent = `fecha: ${noticia.fecha}`;

        noticiaDiv.appendChild(titulo);
        noticiaDiv.appendChild(contenido);
        noticiaDiv.appendChild(fecha);

        contenedorNoticias.appendChild(noticiaDiv);
    });

}

/* section 3!!! */


let elementos= document.querySelectorAll('#caja1, #caja2, #caja3, #caja4');

elementos.forEach(function(elemento){
    elemento.addEventListener('mouseenter', function(){
        elemento.classList.add("rotar");
    });

    elemento.addEventListener('mouseleave', function(){
        elemento.classList.remove("rotar");
    });
});
