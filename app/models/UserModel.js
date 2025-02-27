/// User Model
import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
}, { timestamps: true, versionKey: false }
);
const UserModel = mongoose.model('Users', UserSchema);
export default UserModel;
