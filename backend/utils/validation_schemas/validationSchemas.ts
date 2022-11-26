import { Schema } from "express-validator"

export const createSchema: Schema = {
    firstName: {
        isLength: {
            errorMessage: "max length of a first name is 10 characters and minimum length is 2 characters",
            options: {max: 10,min: 2}
        },
        isString: {
            errorMessage: "first name must be a string",
        },
    },
    lastName: {
        isLength: {
            errorMessage: "max length of a first name is 10 characters and minimum length is 2 characters",
            options: {max: 10,min: 2}
        },
        isString: {
            errorMessage: "first name must be a string",
        },
    },
    emailAddress: {
        isEmail: {
            errorMessage: "invalid email address"
        }
    },
    password: {
        isLength: {
            errorMessage: "password length must be between 4-15 charactars",
            options: {min: 4, max: 15}
        },
        isStrongPassword: {
            options: [{minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1}]
        }
        
    },
    role: {
        isLength: {
            options: {min: 4, max: 4}
        }, 
        isInt: true
    }
}

export const updateSchema: Schema = {
    firstName: {
        isLength: {
            errorMessage: "max length of a first name is 10 characters and minimum length is 2 characters",
            options: {max: 10,min: 2}
        },
        isString: {
            errorMessage: "first name must be a string",
        },
    },
    lastName: {
        isLength: {
            errorMessage: "max length of a first name is 10 characters and minimum length is 2 characters",
            options: {max: 10,min: 2}
        },
        isString: {
            errorMessage: "first name must be a string",
        },
    },
    emailAddress: {
        isEmail: {
            errorMessage: "invalid email address"
        }
    },
    role: {
        isLength: {
            options: {min: 4, max: 4}
        }, 
        isInt: true
    }
}