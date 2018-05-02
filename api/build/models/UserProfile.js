"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserProfileSchema = new mongoose_1.Schema({
    userId: {
        type: String
    },
    userIdToken: {
        type: String
    },
    authToken: {
        type: String
    },
    userEmail: {
        type: String
    },
    userPic: {
        type: String
    },
    userFullName: {
        type: String
    },
    authProvider: {
        type: String
    },
    userStatus: {
        type: String,
        default: 'pending',
        required: true
    },
    newUserPin: {
        type: String
    },
    lastModifiedTime: {
        type: Date,
        required: true
    }
});
exports.default = mongoose_1.model('User', UserProfileSchema);
//# sourceMappingURL=UserProfile.js.map