import { Document, model, Error, Schema, MongooseError } from 'mongoose';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { userInfo } from 'os';

//The user collection schema
const UserSchema: Schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emailAddress: {type: String, required: true, index:{unique: true}},
    password: {type: String, required: true},
    role: {type: Boolean, required: true}  
})

//A middleware that hashs and updates the user password
UserSchema.pre('save', function(next): void{
    var user = this;
    
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR), (err: Error | undefined, salt: string)=>{
        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err: Error | undefined, hash: string)=>{
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })
})

//Password validation method added to the schema.
UserSchema.methods.comparePassword = function(testedPassword: string, callback: Function){
    bcrypt.compare(testedPassword, this.password, (err: Error | undefined, isMatch: Boolean)=>{
        if(err) return callback(err);

        callback(null, isMatch);
    })
}

export default model('user',UserSchema);