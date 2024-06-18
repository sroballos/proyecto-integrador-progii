var express = require('express');
var router = express.Router();
let info = require("../db/info")
const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

let usersController = {
    general: function(req, res) {
        if (!req.session.user) {
            return res.redirect("/login");
        }
        return res.render("profile", { "info": req.session.user }); 
    },
    
    generalOther: function(req, res) {
        db.User.findByPk(req.params.id,{
            include: [{association:"products"}],
            order: [["createdAt", "ASC"]]
        })
        .then(function(data){
            if (data){
            return res.render("profile-other", {info:data})} else{
            return res.render("profile-other", {info:-1})
            }
        })
        .catch(function(error){
            return console.log(error)
        }) 
    },

    register: function(req,res){
            return res.render("register");
    },

    registerStore: function(req, res) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let user = {
                username: req.body.username,
                email: req.body.email,
                passW: bcrypt.hashSync(req.body.passW, 10),
                dateBorn: req.body.dateBorn,
                dni: req.body.dni,
                profilePic: req.body.profilePic
            };

            db.User.create(user)
                .then(function (user){
                    return res.redirect("/profile/login");
                })
                .catch(function(err){
                    console.log("Error al guardar el usuario", err);
                    return res.status(500).send("Error al guardar el usuario");
                });

        } else {
            res.render("register", {
                    errors: errors.mapped(),
                    old: req.body
                });
        }           
     },
       
    login: function(req,res){
        if (req.session.user != undefined) {
            return res.redirect("/");
        } else {
            return res.render("login")
        }
    },

    loginProcess: function (req, res) {
        let informacion = req.body;
        let filtro = {
            where: { email: informacion.email }
        };
    
        db.User.findOne(filtro)
            .then(function(user) {
                if (!user) {
                    return res.send("No existe un usuario con este email " + informacion.email);
                }
    
                let passwordMatches = bcrypt.compareSync(informacion.passW, user.passW);
                
                if (passwordMatches) {
                    req.session.user = user;

                    if(informacion.remember !== undefined){
                        res.cookie("idUsuario",user.id,{ maxAge: 1000 * 60 * 15})
                    }
                    return res.redirect("/"); // Redirigir a la página principal después de iniciar sesión
                } else {
                    return res.send("La contraseña es incorrecta, vuelva a ingresarla");
                }
            })
            .catch(function (err) {
                console.log(err);
                return res.status(500).send("Error al intentar iniciar sesión");
            });
    },
    
    
        
    edit: function(req,res){
        return res.render("profile-edit");
    },

    logout: function(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al cerrar sesión.");
            }
            res.clearCookie('session_id');
            res.redirect('/');
        });
    },

};



module.exports = usersController;