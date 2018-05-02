"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
const ProductCategory = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    categoryName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.model('ProductCategory', ProductCategory);
//# sourceMappingURL=ProductCategory.js.map