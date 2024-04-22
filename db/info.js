let app = require("express");
let router = app.Router();


const albumes = {
    usuario: {
        email: "tomas@example.com",
        nombre: "Tomás Ricci",
        contraseña: "123",
        fecha_de_nacimiento: "12/01/2005",
        nro_de_documento: 123456789,
        foto_de_perfil: "/images/users/fotoPerfil.jpg" 
    },

    productos: [
        {
            imagen: "/images/products/abbeyroad.jpg",
            producto: "Abbey Road",
            descripcion: "El mejor album de la historia de la música",
            comentarios: [
                {
                    nombre_usuario: "Usuario1",
                    texto: "Comentario sobre Abbey Road",
                    imagen_perfil: "/images/users/fotoPerfil.jpg"
                }
            ]
        },
        {
            imagen: "/images/products/sadnecessary.jpeg",
            producto: "Sadnecessary",
            descripcion: "Milky Chance",
            comentarios: [
                {
                    nombre_usuario: "Usuario2",
                    texto_comentario: "Comentario sobre Sadnecessary",
                    imagen_perfil: "/images/users/fotoPerfil.jpg"
                }
            ]
        },   
        {
            imagen: "/images/products/circles.png",
            producto: "Circles",
            descripcion: "Mac Miller",
            comentarios: [
                {
                    nombre_usuario: "Usuario3",
                    texto_comentario: "Comentario sobre Circles",
                    imagen_perfil: "/images/users/fotoPerfil.jpg"
                }
            ]
        },
        {
            imagen: "/images/products/court.jpg",
            producto: "In the Court of the Crimson King",
            descripcion: "King Crimson",
            comentarios: [
                {
                    nombre_usuario: "Usuario4",
                    texto_comentario: "Comentario sobre In the Court of the Crimson King",
                    imagen_perfil: "/images/users/fotoPerfil.jpg"
                }
            ]
        },   
        {
            imagen: "/images/products/iAm.jpg",
            producto: "I am > I was",
            descripcion: "21 Savage",
            comentarios: [
                {
                    nombre_usuario: "Usuario5",
                    texto_comentario: "Comentario sobre I am > I was",
                    imagen_perfil: "/images/users/fotoPerfil.jpg"
                }
            ]
        },
        {
            imagen: "/images/products/Infamous.jpeg",
            producto: "Infamous",
            descripcion: "Mobb Deep",
            comentarios: [
                {
                    nombre_usuario: "Usuario6",
                    texto_comentario: "Comentario sobre Infamous",
                    imagen_perfil: "/images/users/fotoPerfil.jpg"
                }
            ]
        },   
        {
            imagen: "/images/products/Revolver.webp",
            nombre_producto: "Revolver",
            descripcion: "The Beatles",
            comentarios: [
                {
                    nombre_usuario: "Usuario7",
                    texto_comentario: "Comentario sobre Revolver",
                    imagen_perfil: "/images/users/fotoPerfil.jpg"
                }
            ]
        },
        {
            imagen: "/images/products/unVeranoSinTI.jpeg",
            nombre_producto: "Un Verano Sin Ti",
            descripcion: "Bad Bunny",
            comentarios: [
                {
                    nombre_usuario: "Usuario8",
                    texto_comentario: "Comentario sobre Un Verano Sin Ti",
                    imagen_perfil: "/images/users/fotoPerfil.jpg"
                }
            ]
        },
        {
            imagen: "/images/products/aContraLuz.jpeg",
            nombre_producto: "A Contra Luz",
            descripcion: "La Vela Puerca",
            comentarios: [
                {
                    nombre_usuario: "Usuario9",
                    texto_comentario: "Comentario sobre A Contra Luz",
                    imagen_perfil: "/images/users/fotoPerfil.jpg"
                }
            ]
        },
        {
            imagen: "/images/products/trilogy.png",
            nombre_producto: "Trilogy",
            descripcion: "The Weekend",
            comentarios: [
                {
                    nombre_usuario: "Usuario10",
                    texto_comentario: "Comentario sobre Trilogy",
                    imagen_perfil: "/images/users/fotoPerfil.jpg"
                }
            ]
        }
    ]
};

module.exports = albumes;