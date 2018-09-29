'use strict'

var Project= require('../models/project');
var fs= require('fs');


var controller={
    home: function(req,res){
      return res.status(200).send({
        message: 'Soy la home'
      });
    },
    test: function(req, res){
      return res.status(200).send({
        message: 'Soy el test'
      });

    },
    saveProject: function(req, res){
      var project= new Project();
      var params=req.body;

      project.name= params.name;
      project.description=params.description;
      project.category=params.category;
      project.year=params.year;
      project.lang=params.lang;
      project.image= null;

      project.save((err,projectStored)=>{
        if(err) return res.status(500).send({message:"Error en la peticion al guardar"});
        if(!projectStored) return res.status(404).send({message: "No se ha podido guardar el proyecto"});
        return res.status(200).send({project: projectStored});
      });

    },
    getProject: function(req, res){
      var projectId = req.params.id;
      if(projectId== null) return res.status(404).send({message:"El proyecto no existe"});
      Project.findById(projectId, (err, project)=>{
        if (err) return res.status(500).send({message:"Error al devolver los datos"});
        if (!project) return res.status(404).send({message:"El proyecto no existe"});
        return res.status(200).send({
          project
        });
      });

    },
    getProjects : function(req,res){
      Project.find().sort('-year').exec((error, projects)=>{
        if (error) return res.status(500).send({message: "Error al devolver los datos"});
        if(!projects) return res.status(404).send({message:"No hay proyectos para devolver"});
        return res.status(200).send({projects});
      });
    },

    updateProject: function(req, res){
      var projectId =req.params.id;
      var update= req.body;

      Project.findByIdAndUpdate(projectId, update,{new: true} ,(err, projectUpdated)=>{
        if(err) return res.status(500).send({message: "Error al actualizar"});
        if(!projectUpdated)return res.status(404).send({message: "No existe el proyecto para actualizar"});
        return res.status(200).send({project: projectUpdated});

      });

    },

    deleteProject: function(req, res){
      var projectId =  req.params.id;
      Project.findByIdAndRemove(projectId, (err, projectRemove)=>{
        if(err) return res.status(500).send({message:"Se murio 500"});
        if(!projectRemove) return res.status(404).send({message:"No se puede eliminar este projecto"});
        return res.status(200).send({
          project: projectRemove
        });
      });

    },

    uploadImage: function(req, res){
      var projectId= req.params.id;
      var fileName="Imagen No Subida";

      if(req.files){
        var filePath= req.files.image.path;
        var fileSlplit= filePath.split('\\');
        var fileName = fileSlplit[1];
        var extSplit= fileName.split('\.');
        var fileExt= extSplit[1];

        if(fileExt == "png"|| fileExt=="jpg" || fileExt=="jpeg" || fileExt=="gif"){
          Project.findByIdAndUpdate(projectId,{image: fileName},{new:true},(err,projectUpdated)=>{
            if(err) return res.status(500).send({message:"La imagen no se ha subido"});
            if(!projectUpdated) return res.status(404).send({message: "El projecto no existe y no se le ha asignado una imagen"});
            return res.status(200).send({
              files: projectUpdated
            });
          });
        }else {

          fs.unlink(filePath, (err)=>{
            return res.status(200).send({message: "La extension no es valida"});
          });

        }
      }else{
        return res.status(200).send({
          message: fileName
        });
      }
    }

};

module.exports=controller;
