import { model, Schema } from 'mongoose';

const UserProfileSchema: Schema = new Schema({

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

export default model('User', UserProfileSchema);