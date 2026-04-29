import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userService from './userServices.js';

export async function signUp(name, email, password, role) {
    const newUser = await userService.createUser({
        name,
        email,
        password,
        role,
    });
    return newUser;
}

export async function logIn(email, password) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

    const error = new Error('Invalid credentials');
    error.status = 401;

    const user = await userService.getUserByEmail(email);
    if(!user) throw error;

    const match = await bcrypt.compare(password, user.password);
    if(!match) throw error;

    const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return accessToken;
}
