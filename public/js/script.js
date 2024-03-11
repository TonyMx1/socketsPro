const socket=io();
//console.log(socket);

//socket.on("saludo", ()=>{
  //  console.log("Estoy recibiendo tu mensaje");
//});

//http://localhost:3000/socket.io/socket.io.min.js

var enviarDatos=document.getElementById("enviarDatos");
enviarDatos.addEventListener("submit",(e)=>{
    e.preventDefault();
    var pregunta = document.getElementById("pregunta").value;
    var chat = document.getElementById("chat");

    // Enviar la pregunta al servidor
    socket.emit("pregunta", pregunta);

    // Limpiar el contenido del chat antes de recibir la respuesta
    chat.innerHTML = "";

    // Escuchar la respuesta del servidor y agregarla al chat
    socket.on("respuesta", (respuesta) => {
        chat.innerHTML = respuesta;
    });
});