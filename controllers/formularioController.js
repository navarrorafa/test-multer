const Formulario = require('../models/formularioModel');
const {uploadImagem} = require('../helpers/uploadHelper')


const mostrarFormulario = (req, res) => {
  res.render('index');
  
};


const procesarFormulario = (req, res, next) => {
  uploadImagem.single('imagen')(req, res, function(err) {
    if (err) {
      console.error(err);
      res.send('Error al cargar la imagen');
    } else {
      const { nombre, email, mensaje } = req.body;
      const imagen = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        nombreArchivo: req.file.filename
      };

      const nuevoFormulario = new Formulario({
        nombre: nombre,
        email: email,
        mensaje: mensaje,
        imagen: imagen
      });

      nuevoFormulario.save(function(err, formularioGuardado) {
        if (err) {
          console.error(err);
          res.send('Error al guardar en la base de datos');
        } else {
          res.send('Formulario enviado y guardado en la base de datos');
        }
      });
    }
  });
};




const mostrarImagen = (req, res) => {
  const imagenId = req.params.id;
  Formulario.findById(imagenId, function(err, formulario) {
    if (err || !formulario || !formulario.imagen) {
      console.error(err);
      res.status(404).send('Imagen no encontrada');
    } else {
      res.contentType(formulario.imagen.contentType);
      res.send(formulario.imagen.data);
    }
  });
};

module.exports = {
  mostrarFormulario,
  procesarFormulario,
  mostrarImagen
};
