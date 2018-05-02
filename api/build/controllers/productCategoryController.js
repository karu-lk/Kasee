"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductCategory_1 = require("../models/ProductCategory");
class ProductCategoryController {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    all(req, res) {
        ProductCategory_1.default.find()
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.json({ error });
        });
    }
    one(req, res) {
        const categoryName = req.params.categoryName;
        ProductCategory_1.default.findOne({ categoryName })
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    // create a new post
    create(req, res) {
        const id = req.body.productCategoryId;
        const categoryName = req.body.categoryName;
        const description = req.body.description;
        if (!id || !categoryName) {
            res.status(422).json({ message: 'Missing required fields.' + JSON.stringify(req.body) });
        }
        const newProductCategory = new ProductCategory_1.default({
            id,
            categoryName,
            description
        });
        newProductCategory.save()
            .then((data) => {
            res.status(201).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    // update post by params of 'slug'
    update(req, res) {
        const categoryName = req.params.categoryName;
        console.log(`key is ${categoryName}`);
        ProductCategory_1.default.findOneAndUpdate({ categoryName }, req.body)
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    // delete post by params of 'slug'
    delete(req, res) {
        const categoryName = req.params.categoryName;
        ProductCategory_1.default.findOneAndRemove({ categoryName })
            .then(() => {
            res.status(204).end();
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    routes() {
        this.router.get('/', this.all);
        this.router.get('/:categoryName', this.one);
        this.router.post('/', this.create);
        this.router.put('/:categoryName', this.update);
        this.router.delete('/:categoryName', this.delete);
    }
}
exports.ProductCategoryController = ProductCategoryController;
const productCategoryController = new ProductCategoryController();
productCategoryController.routes();
exports.default = productCategoryController.router;
//# sourceMappingURL=productCategoryController.js.map