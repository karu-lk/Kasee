"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
const Stock = new mongoose_1.Schema({
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
    availableQuantity: {
        type: String,
        required: true,
    }
});
exports.default = mongoose_1.model('Stock', Stock);
//# sourceMappingURL=Stock.js.map