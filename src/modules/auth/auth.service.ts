import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  email: string;
  name: string;
}

dotenv.config();
@Injectable()
export class AuthService {
  private readonly acessKey = process.env.ACESS_KEY;

  generateToken(payload: JwtPayload) {
    return jwt.sign(payload, this.acessKey, {
      expiresIn: '1d',
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.acessKey) as JwtPayload;
  }
}
