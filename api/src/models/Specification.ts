import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const Specification: Schema = new Schema({
    customerNumber: {
        type: String,
        unique: true,
        required: true
    },
    shoulder: { type: Number },
    shoulderToBust: { type: Number },
    shoulderToWaist: { type: Number },
    shoulderToBracut: { type: Number },
    bust: { type: Number },
    blouseWaist: { type: Number },
    bracut: { type: Number },
    frontNeck: { type: Number },
    backNeck: { type: Number },
    lengthBack: { type: Number },
    sleaveLength: { type: Number },
    sleaveWidth: { type: Number },
    armCut: { type: Number },
    armPit: { type: Number },
    underskirtWaist: { type: Number },
    underskirtHip: { type: Number },
    underskirtLength: { type: Number }
});

export default model('Specification', Specification);