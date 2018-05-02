"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductImageGallery = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    imageSequenceNo: {
        type: Number,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.model('ProductImageGallery', ProductImageGallery);
//# sourceMappingURL=ProductImageGallery.js.map