import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const Product: Schema = new Schema({
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

export default model('Product', Product);