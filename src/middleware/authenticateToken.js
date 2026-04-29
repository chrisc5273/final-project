import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export function authenticateToken(req,res,next){
    const error = new Error('Not authenticated. Please provide a valid token.');
    error.status = 401;
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(error);
    }

    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = { id: payload.id, role: payload.role };
        next();
    }catch(err){
        err.status = 401;
        return next(err);
    }
}

export const authenticate = authenticateToken;
