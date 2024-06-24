var express = require('express');
var router = express.Router();
let info = require("../db/info")
let db = require("../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

let usersController = {

    general: function(req, res) {
        if(req.params.id){
            db.User.findByPk(req.params.id,{
                include: [{association:"products"}],
                order: [["createdAt", "ASC"]]
            })
            
            .then(function(data) {
                if (data) {
                    if (!data.products) {
                        data.products = [];
                    };
                    if(req.session.user && req.session.user.id == req.params.id){
                        return res.render("profile", {info: data, isOwner: true});
                    } else{
                        return res.render("profile", {info:data, isOwner: false})
                    }
                }
                else{
                    res.redirect("/")
                }
            })

            .catch(function(error){
                return console.log(error)
            })
        } else{
            if (!req.session.user) {
                return res.redirect("/profile/login");
            } else{
                db.User.findByPk(req.session.user.id,{
                    include: [{association:"products"}],
                    order: [["createdAt", "ASC"]]
                })
                .then(function(data){
                    if (data) {
                        if (!data.products) {
                            data.products = [];
                        };
                        return res.render("profile", {info: data, isOwner:true});
                    }
                })
            }

        } 
    },

    register: function(req,res){
            if(req.session.user){
                res.redirect("/")
            } else{
                return res.render("register");
            }
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
                    errors: errors.array(),
                    old: req.body
                });
        }           
     },
       
    login: function(req,res){
        if (req.session.user) {
            return res.redirect("/");
        } else {
            return res.render("login")
        }
    },

    loginProcess: function (req, res) {
        let errors = validationResult(req);
        let informacion = req.body;
        let filtro = {
            where: { email: informacion.email }
        };
    
        db.User.findOne(filtro)
            .then(function(user) {
                // Actualizar para que en vez de renderizarlo el error sea mandado a la página del login como mensaje en la vista
                if (!user) {
                    return res.send("No existe un usuario con este email " + informacion.email);
                }
    
                let passwordMatches = bcrypt.compareSync(informacion.passW, user.passW);
                
                if (passwordMatches) {
                    req.session.user = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        dateBorn: user.dateBorn,
                        dni: user.dni,
                        profilePic: user.profilePic
                    };

                    if(informacion.remember){
                        res.cookie("idUsuario",user.id,{ maxAge: 1000 * 60 * 15});
                    } else{
                        res.cookie("idUsuario",user.id);
                    }
                    return res.redirect("/"); 
                } else {
                    return res.render("login", {
                        errors: errors.mapped(),
                        old: req.body
                    });
                }
            })
            .catch(function (err) {
                console.log(err);
                return res.status(500).send("Error al intentar iniciar sesión");
            });
    },
    
    
        
    edit: function(req,res){
        return res.render("profile-edit", {info: req.session.user});
    },

    storeEdit: function(req,res){
        let informacion = req.body;
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = {
                username: req.body.username,
                email: req.body.email,
                passW: bcrypt.hashSync(req.body.password, 10),
                dateBorn: req.body.fechaNacimiento,
                dni: req.body.nroDocumento,
                profilePic: req.body.profilePic
            };

            let idUsuario = req.session.user.id
            db.User.update(user, {where: {id: idUsuario}})
                .then(function (user){
                    req.session.user = {
                        id: idUsuario,
                        username: req.body.username,
                        email: req.body.email,
                        passW: bcrypt.hashSync(req.body.password, 10),
                        dateBorn: req.body.fechaNacimiento,
                        dni: req.body.nroDocumento,
                        profilePic: req.body.profilePic
                    };

                    return res.redirect("/profile");
                })
                .catch(function(err){
                    console.log("Error al guardar el usuario", err);
                    return res.status(500).send("Error al guardar el usuario");
                });

        } else {
            return res.render("profile-edit", {
                errors: errors.mapped(),
                old: req.body
            });
        }

    },

    logout: function(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al cerrar sesión.");
            } else{
                res.clearCookie('session_id');
                res.redirect('/');
            }
        });
    },

};



module.exports = usersController;