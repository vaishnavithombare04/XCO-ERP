import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

// Password pattern: 8-16 characters, 1 uppercase, 1 special character
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,16}$/;

export const registerSchema = z.object({
  name: z.string()
    .min(20, 'Name must be at least 20 characters')
    .max(60, 'Name must be at most 60 characters'),
  email: z.string().email('Invalid email address'),
  address: z.string().max(400, 'Address must be at most 400 characters'),
  password: z.string()
    .refine((val) => passwordRegex.test(val), {
      message: 'Password must be 8-16 characters long, include at least one uppercase letter and one special character',
    }),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string()
    .refine((val) => passwordRegex.test(val), {
      message: 'New password must be 8-16 characters long, include at least one uppercase letter and one special character',
    }),
});

export const adminCreateUserSchema = z.object({
  name: z.string()
    .min(20, 'Name must be at least 20 characters')
    .max(60, 'Name must be at most 60 characters'),
  email: z.string().email('Invalid email address'),
  address: z.string().max(400, 'Address must be at most 400 characters'),
  password: z.string()
    .refine((val) => passwordRegex.test(val), {
      message: 'Password must be 8-16 characters long, include at least one uppercase letter and one special character',
    }),
  role: z.enum(['ADMIN', 'NORMAL', 'STORE_OWNER']),
});

export const ratingSchema = z.object({
  storeId: z.number().int(),
  rating: z.number().int().min(1).max(5),
});

export const validate = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'error',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
        return;
      }
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  };
};
