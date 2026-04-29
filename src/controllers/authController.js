import {signUp, logIn} from '../services/authService';

export async function signUpHandler(req,res){
    const {email, password} = req.body;

    const newUser = await signUp(email, password);

    res.status(201).json('User Created: ', newUser );

}

export async function logInHandler(req, res, next){
    const {email, password} = req.body;

    const accessToken = await logIn(email, password);
    res.status(201).json({accessToken});

}