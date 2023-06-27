const express = require('express');
const router = express.Router()

const customerController = require("../controllers/customerController");

// Rota para criar um novo customer
router.post('/createCustomer', customerController.createCustomer);

// Rota para atualizar um customer existente
router.put('/updateCustomers/:id', customerController.updateCustomer);

// Rota para deletar um customer existente
router.delete('/deleteCustomers/:id', customerController.deleteCustomer);

module.exports = router