const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventarioController');

router.get('/:id/exportar', controller.exportarExcel);
router.get('/:id/metricas', controller.calcularMetricas);
router.post('/:id/contagem', controller.salvarContagem);
router.get('/:id/divergencias', controller.obterDivergencias);

module.exports = router;
