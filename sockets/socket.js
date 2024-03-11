function socket(io) {
    io.on("connection", (socket) => {
        socket.on("pregunta", (pregunta) => {
            var respuesta = obtenerRespuesta(pregunta);
            socket.emit("respuesta", respuesta);
        });
    });
}

function obtenerRespuesta(pregunta) {
    switch (pregunta) {
        case "1":
            return "Busca 'cmd' en el buscador de windows y selecciona la opcion de ejecutar como administrador";
        case "2":
            return "1. BitDefender, 2. McAfee 3.Avast";
        case "3":
            return "Puedes aplicar una limpieza de archivos o desfragmentar tu disco duro con regularidad";
        case "4":
            return "Si, puede llegar a afectar la vida útil de una memoria ya que tiene un poco de corriente y al hacer eso puede crear un corto circuito y hacer que falle";
        case "5":
            return "Si, el que recomiendo sería el CCleaner, borra todos los archivos inecesarios de tu equipo.";
        default:
            return "Lo siento, no tengo una respuesta para esa pregunta.";
    }
}

module.exports = socket;