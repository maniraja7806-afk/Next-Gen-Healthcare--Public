import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '../models/schemas.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: Role;
  };
}

/**
 * RBAC Middleware: Verifies JWT and checks if user role is in allowed roles.
 */
export const authorizeRoles = (...allowedRoles: Role[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string; role: Role };

      if (!allowedRoles.includes(decoded.role)) {
        // Audit log security violation here in a real app
        console.warn(`[SECURITY] Unauthorized access attempt by user ${decoded.userId}`);
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Token expired or invalid' });
    }
  };
};

/**
 * Field-Level Encryption Utility (Conceptual)
 */
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

export const encryptPHI = (text: string): string => {
  const key = Buffer.from(process.env.ENCRYPTION_KEY || '12345678901234567890123456789012', 'utf8');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
};
