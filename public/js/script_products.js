const socket = io();
var mensajeDiv = document.getElementById("mensaje");
var datosPro = document.getElementById ("datosPro");

//Mostrar Productos

socket.on("servidorEnviarProductos", (productos)=>{
    console.log(productos);
    var tr ="";
    productos.forEach((producto, idLocal) => {
        tr = tr + `
        <tr>
            <td>${idLocal+1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
            <a href="#" onClick="editarProducto('${producto._id}')">Editar</a>
            <a href="#" onClick="borrarProducto('${producto._id}')">Borrar</a>
            </td>
        </tr>
        
        `;
    });
    datosPro.innerHTML = tr;
});


//Guardar datos en MongoDB
var enviarDatosPro = document.getElementById("enviarDatosPro");
enviarDatosPro.addEventListener("submit", (e) => {
    e.preventDefault();
    var producto = {
        id: document.getElementById("id").value,
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        cantidad: document.getElementById("cantidad").value
    };
    socket.emit("clienteGuardarPro", producto);
    socket.on("servidorProductoGuardado", (mensaje) => { 
        console.log(mensaje);
        mensajeDiv.innerHTML = mensaje;
        setTimeout(() => {
            mensajeDiv.innerHTML = "";
        }, 2000);
    });

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("nombre").focus();
});

//Modificar Producto
function editarProducto(id) {
    console.log(id);
    socket.emit("clienteProductoPorID",id);
}

socket.on("servidorProductoPorID",(producto)=>{
    console.log(producto);
    document.getElementById("id").value=producto._id;
    document.getElementById("nombre").value=producto.nombre;
    document.getElementById("precio").value=producto.precio;
    document.getElementById("cantidad").value=producto.cantidad;
    document.getElementById("id").setAttribute("data-producto-id", producto._id);
    document.getElementById("txtNewPro").innerHTML="Editar Producto";
    document.getElementById("txtGuardarPro").innerHTML="GUARDAR CAMBIOS";
});

//Borrar Producto
function borrarProducto(id) {
    console.log(id);
    socket.emit("borrarPro",id);
    document.getElementById("mensaje").innerHTML="PRODUCTO BORRADO DE LA BD";
    setTimeout(() => {mensajeDiv.innerHTML = "";}, 2000);
}