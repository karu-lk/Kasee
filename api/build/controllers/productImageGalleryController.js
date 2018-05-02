"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductImageGallery_1 = require("../models/ProductImageGallery");
class ProductImageGalleryController {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    all(req, res) {
        ProductImageGallery_1.default.find()
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.json({ error });
        });
    }
    one(req, res) {
        const id = req.params.imageId;
        ProductImageGallery_1.default.findOne({ id })
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    // create a new post
    create(req, res) {
        const id = req.body.imageId;
        const imageSequenceNo = req.body.imageSequenceNo;
        const imagePath = req.body.imagePath;
        const description = req.body.description;
        if (!id || !imagePath) {
            res.status(422).json({ message: 'Missing required fields.' });
        }
        const newProductImageGallery = new ProductImageGallery_1.default({
            id,
            imageSequenceNo,
            imagePath,
            description
        });
        newProductImageGallery.save()
            .then((data) => {
            res.status(201).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    // update post by params of 'slug'
    update(req, res) {
        const id = req.params.imageId;
        ProductImageGallery_1.default.findOneAndUpdate({ id }, req.body)
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    // delete post by params of 'slug'
    delete(req, res) {
        const id = req.params.imageId;
        ProductImageGallery_1.default.findOneAndRemove({ id })
            .then(() => {
            res.status(204).end();
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    routes() {
        this.router.get('/', this.all);
        this.router.get('/:imageId', this.one);
        this.router.post('/', this.create);
        this.router.put('/:imageId', this.update);
        this.router.delete('/:imageId', this.delete);
    }
}
exports.ProductImageGalleryController = ProductImageGalleryController;
const productImageGalleryController = new ProductImageGalleryController();
productImageGalleryController.routes();
exports.default = productImageGalleryController.router;
//# sourceMappingURL=productImageGalleryController.js.map