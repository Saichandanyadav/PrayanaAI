import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest, TokenPayload } from '../types';

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied. Security Bearer Token missing.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback_super_secret_key_string';
    const verified = jwt.verify(token, secret) as TokenPayload;
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Session expired or invalid authentication token.' });
  }
};