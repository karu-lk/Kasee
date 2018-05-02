"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
const Product = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    productCategory: {
        type: Number,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: false
    },
    sellPrice: {
        type: Number,
        required: false
    },
    productImageGallery: {
        type: Number,
        required: false
    }
});
exports.default = mongoose_1.model('Product', Product);
//# sourceMappingURL=Product.js.map