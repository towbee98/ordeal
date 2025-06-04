import jwt, { SignOptions } from 'jsonwebtoken';
import { IManager } from '../models/manager.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (manager: IManager): string => {
  const payload: TokenPayload = {
    id: manager._id.toString(),
    email: manager.email,
    role: manager.role,
  };

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}; 