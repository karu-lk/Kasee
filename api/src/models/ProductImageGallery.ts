import { model, Schema } from 'mongoose';

const ProductImageGallery: Schema = new Schema({
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

export default model('ProductImageGallery', ProductImageGallery);