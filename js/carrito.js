//const cargarJsonCategory = document.querySelector('#categoria');
//document.addEventListener('DOMContentLoaded',obtenerDatosCategoria);
//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorWs = document.querySelector('#whatsapp');

let articulosCarrito=[];

cargarEventListeners();

function cargarEventListeners(){

    document.addEventListener('DOMContentLoaded',obtenerDatosCategoria);

    //Cuando agregamos un curso presionando "Agregar Carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //Elimina curso del carrito
    carrito.addEventListener('click',eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',() =>{
        articulosCarrito=[];

        limpiarHTML();
    });

    document.querySelector("#submit").addEventListener("click", e => {
        e.preventDefault();
      
        whatsapp();
        window.open(url1);
       
      });
}

function obtenerDatosCategoria(){
    const url = '../data/category.json'; 
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado=> mostrarCategoryHTML(resultado))
}

function mostrarCategoryHTML(categorias){
    const contenido = document.querySelector('#categoria');

    let categoriahtml = '';

    categorias.forEach(categoria => {
        const {id,nombre,imagen,precio} = categoria;

        categoriahtml += `
                      
            <div class="col-sm-4">
            
                <div class="card">
                    <img src="${imagen}" alt="..." >
                    <div class="card-body">
                        <h4 class="card-title">${nombre}</h4>
                        <p class="card-text precio">S/.<span>${precio}</span></p>
                        <a href="#" class="btn btn-primary agregar-carrito" data-id="${id}">Agregar Al Carrito</a>

                    </div>
                </div>

            </div>
            
        `;

    });

    contenido.innerHTML = categoriahtml;
}

function agregarCurso(e){
    
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
       const cursoSeleccionado = e.target.parentElement.parentElement;
       leerDatosCurso(cursoSeleccionado);
        
      
    }
    
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del carrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //Itera sobre el carrito y mostrar ak HTML
    }
    
}

//Lee el contenido del HTML y extrae información del curso

function leerDatosCurso(curso){
    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revvisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    

    carritoHTML();
}

function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML();
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const {imagen,nombre,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `

            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;

        //agregar el html del carrito en el tbody
        contenedorCarrito.appendChild(row);

       
    });
}

//Elimina los cursos del TBODY

function limpiarHTML(){
   //Limpiar de forma lenta
    // contenedorCarrito.innerHTML = ''

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function whatsapp(){

    let cliente = document.querySelector("#cliente").value;
    let direccion = document.querySelector("#dire").value;

    let subtotal;
    let total = 0;
    let item = 0;
    const valor = articulosCarrito.map((articulo,i)=> {
      const {imagen,nombre,precio,cantidad}=articulo;
       
        item = i + 1;
        subtotal = cantidad * precio;
        total = total + subtotal ;
        
        return "%0A"+'"'+ imagen.appendChild  + '"'+  "%0A" + cantidad + " " + nombre + " Subtotal: S/" + "*"+subtotal+"*%0A";
            
        
    });
    
   

     url1 = "https://api.whatsapp.com/send?phone=51981482801&text=*Joly Accesorios*%0A*Productos Seleccionados*%0A" + item + "%0A *Total a pagar: PEN s/* " + "*"+total+"*" + "%0A%0A Información de Contacto : %0A Nombre:" + cliente + "%0A Dirección " + direccion + "%0A%0A Hola gracias, quedo pendiente.";
    
    
  
}