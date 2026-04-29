import {param, query, oneOf, body} from 'express-validator';
import {handleValidationErrors} from './handleValidation.js';
import prisma from '../config/db.js';

export const validateId = [
    param('id')
        .trim()
        .escape()
        .isInt({min: 1})
        .withMessage('Id must be a positive integer'),
    handleValidationErrors,

];

export const validateCreateUser = [
    body('email').custom(async (email) => {
        const existingUser = await prisma.users.findUnique({
            where: {email: email.toLowerCase()},
        });

        if(existingUser) throw new Error('User Email already exists');

        return true;

    }),

    handleValidationErrors

    
]
