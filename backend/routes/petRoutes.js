const express = require('express');
const PetController = require('../controllers/petControllers');

const router = express.Router();

router.get('/', PetController.getAllPets);
router.get('/:_id', PetController.getPetById);
router.post('/new', PetController.createPet);
router.put('/update/:_id', PetController.updatePet);
router.delete('/delete/:_id', PetController.deletePet);


module.exports = router;
