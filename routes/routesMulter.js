const express = require('express');
const router = express.Router();
const {mostrarFormulario,mostrarImagen,procesarFormulario} = require('../controllers/formularioController');


router.get('/', mostrarFormulario);

router.post('/procesar', procesarFormulario );

router.get('/imagen/:id', mostrarImagen);

module.exports = router;
