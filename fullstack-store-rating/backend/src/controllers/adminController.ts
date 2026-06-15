import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient, Role } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.user.count({ where: { role: Role.STORE_OWNER } });
    const totalRatings = await prisma.rating.count();

    const normalUsersCount = await prisma.user.count({ where: { role: Role.NORMAL } });
    const adminUsersCount = await prisma.user.count({ where: { role: Role.ADMIN } });

    res.status(200).json({
      status: 'success',
      data: {
        totalUsers,
        totalStores,
        totalRatings,
        breakdown: {
          admin: adminUsersCount,
          normal: normalUsersCount,
          storeOwner: totalStores,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

export const addUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password, address, role } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({
        status: 'error',
        message: 'Email already registered',
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role: role as Role,
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

export const getUsersList = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { search = '', role, sortBy = 'name', sortOrder = 'asc' } = req.query;

    const whereClause: any = {
      // Exclude stores from general users list? The prompt says:
      // "Can view a list of normal and admin users with: Name, Email, Address, Role."
      // So we filter: role is either NORMAL or ADMIN.
      role: role ? (role as Role) : { in: [Role.NORMAL, Role.ADMIN] },
    };

    if (search) {
      whereClause.OR = [
        { name: { contains: String(search) } },
        { email: { contains: String(search) } },
        { address: { contains: String(search) } },
      ];
    }

    const rawUsers = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
      },
    });

    // In-memory sort
    rawUsers.sort((a, b) => {
      let valA = a[sortBy as keyof typeof a];
      let valB = b[sortBy as keyof typeof b];

      if (valA === undefined) valA = a.name;
      if (valB === undefined) valB = b.name;

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB as string).toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    res.status(200).json({
      status: 'success',
      data: rawUsers,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

export const getStoresList = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { search = '', sortBy = 'name', sortOrder = 'asc' } = req.query;

    const whereClause: any = {
      role: Role.STORE_OWNER,
    };

    if (search) {
      whereClause.OR = [
        { name: { contains: String(search) } },
        { email: { contains: String(search) } },
        { address: { contains: String(search) } },
      ];
    }

    const rawStores = await prisma.user.findMany({
      where: whereClause,
      include: {
        receivedRatings: true,
      },
    });

    const stores = rawStores.map((store) => {
      const ratings = store.receivedRatings;
      const count = ratings.length;
      const avgRating = count > 0
        ? parseFloat((ratings.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1))
        : 0;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        rating: avgRating,
        totalRatings: count,
      };
    });

    // Sort
    stores.sort((a, b) => {
      let valA: any = a[sortBy as keyof typeof a];
      let valB: any = b[sortBy as keyof typeof b];

      if (valA === undefined) valA = a.name;
      if (valB === undefined) valB = b.name;

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB as string).toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    res.status(200).json({
      status: 'success',
      data: stores,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

export const getUserDetails = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        receivedRatings: true,
      },
    });

    if (!user) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
    }

    const ratings = user.receivedRatings;
    const count = ratings.length;
    const avgRating = count > 0
      ? parseFloat((ratings.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1))
      : 0;

    res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        rating: user.role === Role.STORE_OWNER ? avgRating : undefined,
        totalRatings: user.role === Role.STORE_OWNER ? count : undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};
