import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const Customer: Schema = new Schema({
  customerNumber: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false
  },
  mobileNumber: {
    type: String,
    required: false
  },
  identificationComment: {
    type: String,
    required: false
  }
});

export default model('Customer', Customer);