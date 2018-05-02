"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = require("../models/Product");
class ProductController {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    // get all of the posts in the database
    all(req, res) {
        Product_1.default.find()
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.json({ error });
        });
    }
    // get a single post by params of 'slug'
    one(req, res) {
        const sku = req.params.sku;
        Product_1.default.findOne({ sku })
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    // create a new post
    create(req, res) {
        const id = req.body.productId;
        const sku = req.body.sku;
        const productName = req.body.productName;
        const description = req.body.description;
        const productCategory = req.body.productCategory;
        if (!id || !sku || !productName || description || productCategory) {
            res.status(422).json({ message: 'All Fields Required.' });
        }
        const newProduct = new Product_1.default({
            id,
            sku,
            productName,
            description,
            productCategory
        });
        newProduct.save()
            .then((data) => {
            res.status(201).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    // update post by params of 'slug'
    update(req, res) {
        const sku = req.body.sku;
        Product_1.default.findOneAndUpdate({ sku }, req.body)
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    // delete post by params of 'slug'
    delete(req, res) {
        const sku = req.body.sku;
        Product_1.default.findOneAndRemove({ sku })
            .then(() => {
            res.status(204).end();
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    routes() {
        this.router.get('/', this.all);
        this.router.get('/:sku', this.one);
        this.router.post('/', this.create);
        this.router.put('/:sku', this.update);
        this.router.delete('/:sku', this.delete);
    }
}
exports.ProductController = ProductController;
const productController = new ProductController();
productController.routes();
exports.default = productController.router;
//# sourceMappingURL=productController.js.map