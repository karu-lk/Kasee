import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const ProductCategory: Schema = new Schema({
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

export default model('ProductCategory', ProductCategory);