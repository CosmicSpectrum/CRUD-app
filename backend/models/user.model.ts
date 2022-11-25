import { model, Schema, Model, Document } from 'mongoose';
const bcrypt = require('bcrypt');


interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    emailAddress: string;
    homeAddress: string;
    role: number;
}

const UserSchema: Schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, index:{unique: true}},
    password: {type: String, required: true},
    emailAddress: {type: String, required: true},
    homeAddress: {type: String, required: true},
    role: {type: Number, required: true}  
})



export const User: Model<IUser> = model('user',UserSchema);