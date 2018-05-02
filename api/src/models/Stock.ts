import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const Stock: Schema = new Schema({
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

export default model('Stock', Stock);