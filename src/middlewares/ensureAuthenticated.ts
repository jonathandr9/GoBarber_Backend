import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';
import authConfig from '../config/auth';
import { sub } from 'date-fns';

interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}


export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void{

    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error('JWT token is missing')
    }

    const [, token] = authHeader.split(' ');

    try{

        const decoded = verify(token, authConfig.jwt.secret);

        const {sub} = decoded as TokenPayload; //Força para que decoded seja entendido como o tipo  TokenPayload

        request.user = {
            id: sub,
        };

        return next();
    }catch (err){
        throw new Error('Invalid JWT Token');
    }
}
