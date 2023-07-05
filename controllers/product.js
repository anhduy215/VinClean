const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const ProductDetail = require("../models/productdetail");
const Category = require("../models/category");
const mongoose = require("mongoose");

//tìm product với name
exports.getProductsByName = (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const name = req.query.productName || "";
    let totalItems;
  
    const findProducts = () => {
      return Product.find({ productName: { $regex: name, $options: "i" } })
        .countDocuments()
        .then((count) => {
          totalItems = count;
          return Product.find({ productName: { $regex: name, $options: "i" } })
            .populate({
              path: 'categoryID',
              select: 'categoryName'
            })
            .populate({
              path: 'productDetailID',
              select: 'productName status quantity image description price'
            })
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .sort({ created: -1 });
        });
    };
  
    findProducts()
      .then((products) => {
        res.status(200).json({
          totalPage: Math.ceil(totalItems / perPage),
          totalItems,
          perPage,
          currentPage,
          list: products
        });
      })
      .catch((err) => console.log(err));
  };
  

//trả về all product
exports.allProducts = (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const name = req.query.productName || "";
    let totalItems;
  
    const findProducts = () => {
      return Product.find()
        .countDocuments()
        .then((count) => {
          totalItems = count;
          return Product.find({}).populate({
            path: 'categoryID',
            select: 'categoryName'
          }).populate({
            path: 'productDetailID',
            select: 'productName status quantity image description price'
          }).skip((currentPage - 1) * perPage)
            .limit(perPage)
            .sort({ created: -1 });
        });
    };
  
    findProducts()
      .then((products) => {
        res.status(200).json({
          totalPage: Math.ceil(totalItems / perPage),
          totalItems,
          perPage,
          currentPage,
          list: products,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
      });
  };

//add product
exports.addProduct = (req, res) => {
    const { user, product, category, productDetail } = req.body;
  
    // Kiểm tra xem categoryID có tồn tại trong bảng Category không
    Category.findById(category._id)
      .then((existingCategory) => {
        if (!existingCategory) {
          return res.status(400).json({ error: "Invalid category ID" });
        }
  
        // Kiểm tra xem productID đã tồn tại trong bảng Product chưa
        Product.findById(product._id)
          .then((existingProduct) => {
            if (existingProduct) {
              return res.status(400).json({ error: "Product ID already exists" });
            }
  
            // Tạo một đối tượng mới của ProductDetail với các thông tin nhận được từ yêu cầu
            const newProductDetail = new ProductDetail(productDetail);
  
            // Lưu đối tượng mới vào cơ sở dữ liệu
            newProductDetail
              .save()
              .then((savedProductDetail) => {
                // Tạo một đối tượng mới của Product với thông tin từ yêu cầu, categoryID và productDetailID
                const newProduct = new Product({
                  productID: product._id,
                  AccountID: user._id,
                  categoryID: category._id,
                  productDetailID: savedProductDetail._id,
                  created: new Date()
                });
  
                // Lưu đối tượng mới vào cơ sở dữ liệu
                newProduct
                  .save()
                  .then((product) => {
                    res.status(200).json({ message: "Product added successfully", product });
                  })
                  .catch((err) => {
                    res.status(500).json({ error: "Failed to add product", errorMessage: err.message });
                  });
              })
              .catch((err) => {
                res.status(500).json({ error: "Failed to add product detail", errorMessage: err.message });
              });
          })
          .catch((err) => {
            res.status(500).json({ error: "Failed to check product ID", errorMessage: err.message });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to check category ID", errorMessage: err.message });
      });
  };

//sửa product
exports.updateProduct = (req, res) => {
  const { productID, product, category, productDetail } = req.body;

  // Kiểm tra xem productID có tồn tại trong bảng Product không
  Product.findById(productID)
    .then((existingProduct) => {
      if (!existingProduct) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      // Kiểm tra xem categoryID có tồn tại trong bảng Category không
      Category.findById(category._id)
        .then((existingCategory) => {
          if (!existingCategory) {
            return res.status(400).json({ error: "Invalid category ID" });
          }

          // Cập nhật thông tin của ProductDetail
          ProductDetail.findByIdAndUpdate(
            existingProduct.productDetailID,
            {
              productName: productDetail.productName,
              status: productDetail.status,
              quantity: productDetail.quantity,
              image: productDetail.image,
              description: productDetail.description,
              price: productDetail.price
            },
            { new: true }
          )
            .then((updatedProductDetail) => {
              // Cập nhật thông tin của Category
              existingCategory.categoryName = category.categoryName;

              // Lưu cả Category và UpdatedProductDetail
              Promise.all([existingCategory.save(), updatedProductDetail.save()])
                .then(([savedCategory, savedProductDetail]) => {
                  // Cập nhật thông tin của Product
                  existingProduct.productName = product.productName;
                  existingProduct.categoryID = savedCategory._id;

                  existingProduct
                    .save()
                    .then((updatedProduct) => {
                      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
                    })
                    .catch((err) => {
                      res.status(500).json({ error: "Failed to update product", errorMessage: err.message });
                    });
                })
                .catch((err) => {
                  res.status(500).json({ error: "Failed to update category or product detail", errorMessage: err.message });
                });
            })
            .catch((err) => {
              res.status(500).json({ error: "Failed to update product detail", errorMessage: err.message });
            });
        })
        .catch((err) => {
          res.status(500).json({ error: "Failed to check category ID", errorMessage: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to check product ID", errorMessage: err.message });
    });
};

//detele sp theo id
exports.deleteProduct = (req, res) => {
  const { productID } = req.body;

  // Kiểm tra xem productID có tồn tại trong bảng Product không
  Product.findById(productID)
    .then((existingProduct) => {
      if (!existingProduct) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      // Xóa sản phẩm
      existingProduct
        .remove()
        .then(() => {
          res.status(200).json({ message: "Product deleted successfully" });
        })
        .catch((err) => {
          res.status(500).json({ error: "Failed to delete product", errorMessage: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to check product ID", errorMessage: err.message });
    });
};
