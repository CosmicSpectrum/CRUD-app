import { model, Schema } from 'mongoose';
const bcrypt = require('bcrypt');


const UserSchema: Schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emailAddress: {type: String, required: true, index:{unique: true}},
    password: {type: String, required: true},
    role: {type: String, required: true}  
})

//A middleware that hashs and updates the user password
UserSchema.pre('save', function(next): void{
    var user = this;
    
    if(!user.isModified('password')) return next();

    bcrypt.getSalt(process.env.SALT_WORK_FACTOR, (err: Error, salt: string)=>{
        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err: Error, hash: string)=>{
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })
})

//Password validation method added to the schema.
UserSchema.methods.comparePassword = function(testedPassword: string, callback: Function){
    bcrypt.compare(testedPassword, this.password, (err: Error, isMatch: Boolean)=>{
        if(err) return callback(err);

        callback(null, isMatch);
    })
}

export default model('user',UserSchema);