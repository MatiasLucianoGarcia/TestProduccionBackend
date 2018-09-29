// =================================
//          PUERTO
// =================================

process.env.PORT= process.env.PORT || 3700;

// =================================
//          ENTORNO
// =================================

process.env.NODE_ENV= process.env.NODE_ENV || "dev";

// =================================
//          DATABASE
// =================================

let urldb;

if(process.env.NODE_ENV === "dev"){
  urldb= 'mongodb://localhost:27017/portafolio';
}else{
  urldb=process.env.MONGO_URI;
}
process.env.URLDB=urldb;
