import jwt from 'jsonwebtoken';
import { createUser, getUserById, getUserByEmail } from '../controllers/userController';

export async function signUp(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ email, password:hashedPassword });
    return newUser;
}

export async function logIn(email, password) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

    const error = new Error('Invalid credentials');

    error.status = 401;
    //needs to be edited
    const user = getUserByEmail(email);
    if(!user) throw error;

    const match = await bcrypt.compare(password, user.password);
    if(!match) throw error;

    //needs to be edited later on
    const accessToken = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN} );

    return accessToken;
}