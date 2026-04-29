import {param, query, oneOf, body} from 'express-validator';
import {handleValidationErrors} from './handleValidation.js';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();


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
        const existingUser = await prisma.users.findUniqe({
            where: {email: email.toLowerCase()},
        });

        if(existingUser) throw new Error('User Email already Exists');

        return true;

    }),

    handleValidationErrors

    
]
