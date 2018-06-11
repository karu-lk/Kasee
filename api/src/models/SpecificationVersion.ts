import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const SpecificationVersion: Schema = new Schema({
    customerNumber: {
        type: String,
        required: true
    },
    specificationVersionNumber: {
        type: Number,
        required: true
    },
    specificationVersionName: {
        type: String
    }
});

export default model('SpecificationVersion', SpecificationVersion);