import { Router } from 'express';
import {
  register,
  login,
  changePassword,
} from '../controllers/authController';
import {
  getStores,
  getStoreOwnerDashboard,
} from '../controllers/storeController';
import {
  submitRating,
  modifyRating,
} from '../controllers/ratingController';
import {
  getDashboardStats,
  addUser,
  getUsersList,
  getStoresList,
  getUserDetails,
} from '../controllers/adminController';
import { protect, restrictTo } from '../middleware/auth';
import {
  validate,
  registerSchema,
  loginSchema,
  changePasswordSchema,
  adminCreateUserSchema,
  ratingSchema,
} from '../middleware/validate';
import { Role } from '@prisma/client';

const router = Router();

// --- Auth Routes ---
router.post('/auth/register', validate(registerSchema), register);
router.post('/auth/login', validate(loginSchema), login);
router.patch('/auth/change-password', protect, validate(changePasswordSchema), changePassword);

// --- User (Normal User) Store & Rating Routes ---
router.get('/stores', protect, getStores);
router.post('/ratings', protect, restrictTo(Role.NORMAL), validate(ratingSchema), submitRating);
router.put('/ratings', protect, restrictTo(Role.NORMAL), validate(ratingSchema), modifyRating);

// --- Store Owner Routes ---
router.get('/stores/owner-dashboard', protect, restrictTo(Role.STORE_OWNER), getStoreOwnerDashboard);

// --- Admin Routes ---
router.get('/admin/stats', protect, restrictTo(Role.ADMIN), getDashboardStats);
router.post('/admin/users', protect, restrictTo(Role.ADMIN), validate(adminCreateUserSchema), addUser);
router.get('/admin/users', protect, restrictTo(Role.ADMIN), getUsersList);
router.get('/admin/stores', protect, restrictTo(Role.ADMIN), getStoresList);
router.get('/admin/users/:id', protect, restrictTo(Role.ADMIN), getUserDetails);

export default router;
