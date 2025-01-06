import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { cookieConfig } from 'src/common/config/cookie.config';

@Injectable()
export class CookieService {
    setToken(res: Response, token: string) {
        if (!token) {
            throw new Error('Invalid or empty token cannot be set in cookie.');
        }
        res.cookie('jwt', token, cookieConfig);
    }

    clearToken(res: Response) {
        res.clearCookie('jwt', {
            ...cookieConfig,
            maxAge: 0
        });
    }
}