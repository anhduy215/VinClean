const express = require("express");
const Payment = require('../models/payment');
const crypto = require('crypto');
const querystring = require('qs');
const router = express.Router();
const mongoose = require("mongoose");

// Xử lý yêu cầu tạo thanh toán
exports.createPayment = async (req, res) => {
    try {
        const { payment } = req.body;

        const existingOrder = await Order.findById(payment.orderID);
        if(!existingOrder){
            return res.status(404).json({ message: 'invalid order' });
        }
        const newPayment = new Payment(payment);
        newPayment.createdAt = Date.now();

        const createdPayment = await newPayment.save();

        res.status(201).json(createdPayment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Xử lý yêu cầu tạo mã QR
exports.generateQR = async (req, res) => {
    try {
      const paymentId = req.params.paymentID;
  
      // Tìm thanh toán theo ID
      const payment = await Payment.findById(paymentId);
  
      if (!payment) {
        return res.status(404).json({ message: 'Thanh toán không tồn tại' });
      }
  
      // Tạo mã QR từ thông tin thanh toán
      const qrData = JSON.stringify({
        id: payment._id,
        amount: payment.amount,
        description: payment.description,
      });
  
      // Tạo mã QR từ dữ liệu
      const qrCodeImage = await QRCode.toDataURL(qrData);
  
      // Trả về mã QR
      res.send(qrCodeImage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

  // Xử lý yêu cầu tạo mã QR vnpay
  // exports.QRVNP = async (req, res) => {
  //   try {
  //     const paymentId = req.params.id;
  //     const payment = await Payment.findById(paymentId);
  
  //     if (!payment) {
  //       return res.status(404).json({ message: 'Thanh toán không tồn tại' });
  //     }
  
  //     const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // URL thanh toán VNPay
  
  //     const vnp_Params = {
  //       vnp_Version: '2.0.0',
  //       vnp_Command: 'pay',
  //       vnp_TmnCode: 'YOUR_TMN_CODE', // Mã cửa hàng VNPay
  //       vnp_Amount: payment.amount * 100,
  //       vnp_CurrCode: 'VND',
  //       vnp_TxnRef: payment._id,
  //       vnp_OrderInfo: payment.description,
  //       vnp_ReturnUrl: 'YOUR_RETURN_URL', // URL trả về sau khi thanh toán thành công
  //     };
  
  //     const secretKey = 'YOUR_SECRET_KEY'; // Khóa bí mật VNPay
  //     const vnp_Params_Sorted = Object.keys(vnp_Params).sort().reduce((acc, key) => {
  //       acc[key] = vnp_Params[key];
  //       return acc;
  //     }, {});
  
  //     const signData = querystring.stringify(vnp_Params_Sorted, { encode: false });
  
  //     const hmac = crypto.createHmac('SHA256', secretKey);
  //     const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex').toUpperCase();
  
  //     vnp_Params['vnp_SecureHashType'] = 'SHA256';
  //     vnp_Params['vnp_SecureHash'] = signed;
  
  //     const vnpUrlWithParams = vnpUrl + '?' + querystring.stringify(vnp_Params, { encode: false });
  
  //     res.send(vnpUrlWithParams);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'lỗi server', errorMessage: error.message });
  //   }
  // };

  
  exports.QRVNP = async (req, res) => {
  var ipAddr = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

  var config = require('config');
  var dateFormat = require('dateformat');

  
  var tmnCode = config.get('vnp_TmnCode');
  var secretKey = config.get('vnp_HashSecret');
  var vnpUrl = config.get('vnp_Url');
  var returnUrl = config.get('vnp_ReturnUrl');

  var date = new Date();

  var createDate = dateFormat(date, 'yyyymmddHHmmss');
  var orderId = dateFormat(date, 'HHmmss');
  var amount = req.body.amount;
  var bankCode = req.body.bankCode;
  
  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType;
  var locale = req.body.language;
  if(locale === null || locale === ''){
      locale = 'vn';
  }
  var currCode = 'VND';
  var vnp_Params = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';  
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['vnp_Merchant'] = ''
  vnp_Params['vnp_Locale'] = locale;
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = orderInfo;
  vnp_Params['vnp_OrderType'] = orderType;
  vnp_Params['vnp_Amount'] = amount * 100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;
  if(bankCode !== null && bankCode !== ''){
      vnp_Params['vnp_BankCode'] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var signData = querystring.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

  res.redirect(vnpUrl)
};
