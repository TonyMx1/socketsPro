const Usuario=require("../modelos/usuario");
const Producto=require("../modelos/products");

function socket(io) {
    io.on("connection", (socket) => {
        //MOSTRAR USUARIOS
        mostrarUsuarios();
        async function mostrarUsuarios(){
            const usuarios=await Usuario.find();
            io.emit("servidorEnviarUsuarios", usuarios);
        }

        //GUARDAR USUARIO
        socket.on("clienteGuardarUsuario", async (usuario)=>{
            try{
            await new Usuario(usuario).save();
            io.emit("servidorUsuarioGuardado","Usuario guardado");
        }
        catch(err){
            console.log("Error al registrar al usuario "+err);
        }
        });

        // Mostrar Productos
        mostrarProductos();
        async function mostrarProductos() {
            try {
                const productos = await Producto.find();
                io.emit("servidorEnviarProductos", productos);
            } catch (error) {
                console.log("Error al insertar producto" +err);
            }
        }

        // Guardar Productos
        socket.on("clienteGuardarPro", async (producto) => {
            try {
                await new Producto(producto).save();
                io.emit("servidorProductoGuardado", "Producto guardado");
                console.log("Producto guardado");
            } catch (error) {
                console.log(error);
            }
        });
    });
}

//FIN IO.ON



module.exports = socket;