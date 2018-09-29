'use strict'
require('./config/config');
var mongoose= require('mongoose');
var app=require('./app');

mongoose.Promise= global.Promise;

mongoose.connect(process.env.URLDB)
                .then(()=>{
                    console.log("CONEXION A MONGO EXITOSA!");

                    //Creacion del servidor
                    app.listen(process.env.PORT,()=>{
                      console.log("Servidor Corriendo correctamente en url: localhost:3700");
                    });
                })
                .catch(err=>{
                    console.log(err);
                });

//
//mongodb://localhost:27017/portafolio
//mongodb://admin:admin1234@ds119343.mlab.com:19343/mongoproject
