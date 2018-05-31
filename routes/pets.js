const express = require('express');
const router = express.Router();
const petController = require('../app/api/controllers/pets');

router.get('/', petController.getAll);
router.post('/', petController.create);
router.get('/:petId', petController.getById);
router.get('/getByCat/:cat', petController.getByCat);
router.put('/:petId', petController.updateById);
router.delete('/:petId', petController.deleteById);

module.exports = router;