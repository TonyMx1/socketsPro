const Usuario=require("../modelos/usuario");
const Producto=require("../modelos/products");

function socket(io) {
    io.on("connection", (socket) => {
        //MOSTRAR USUARIOS
        mostrarUsuarios();
        async function mostrarUsuarios() {
            try {
                const usuarios = await Usuario.find();
                io.emit("servidorEnviarUsuarios", usuarios);
            } catch (error) {
                console.log(error);
            }
        }

        // Guardar Usuario
        socket.on("clienteGuardarUsuario", async (usuario) => {
            try {
                if (usuario.id && usuario.id !== "") {
                    await Usuario.findByIdAndUpdate(usuario.id, usuario);
                    io.emit("servidorUsuarioGuardado", "Usuario actualizado");
                } else {
                    await new Usuario(usuario).save();
                    io.emit("servidorUsuarioGuardado", "Usuario guardado");
                }
                mostrarUsuarios();
            } catch (error) {
                console.log(error);
            }
        });

        //OBTENER USUARIO POR ID
        socket.on("clienteObtenerUsuarioPorID",async(id)=>{
            const usuario=await Usuario.findById(id);
            io.emit("servidorObtenerUsuarioPorID",usuario);
        });

        //BORRAR USUARIO POR ID
        socket.on("clienteBorrarUsuario",async(id)=>{
            await Usuario.findByIdAndDelete(id);
            io.emit("servidorUsuarioGuardado","Usuario borrado");
            console.log("Usuario borrado en la BD");
            mostrarUsuarios();
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

        //OBTENER PRODUCTO POR ID
        socket.on("clienteProductoPorID",async(id)=>{
            const producto=await Producto.findById(id);
            io.emit("servidorProductoPorID",producto);
        });

        //BORRAR PRODUCTO POR ID
        socket.on("borrarPro",async(id)=>{
            await Producto.findByIdAndDelete(id);
            io.emit("servidorProductoGuardado", "Producto borrado");
            console.log("Producto borrado de la BD");
            mostrarProductos();
        })


    }); //fin io.on
    
}

module.exports = socket;