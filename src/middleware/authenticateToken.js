import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(req,res,next){
    const error = new Error('not Authenticated. Please provide a valid Token.')
    error.status = 401;
    const authHeader = req.headers.authorization;

    if(!autheader || !authHeader.startsWith('Bearer ')){
        return next(error);
    }

    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = {id: payload.id};
        next();
    }catch(error){
        return next(error);
    }
}