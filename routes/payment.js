const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

// Định nghĩa route xử lý tạo thanh toán
router.post('/payment', paymentController.createPayment);
router.get('/payments/:paymentID', paymentController.generateQR);
router.get('/payments/', paymentController.QRVNP);

module.exports = router;
