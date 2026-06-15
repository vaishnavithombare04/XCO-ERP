import { Response } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getStores = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { search = '', sortBy = 'name', sortOrder = 'asc' } = req.query;

    if (!userId) {
      res.status(401).json({ status: 'error', message: 'Not authenticated' });
      return;
    }

    // Find all users who are store owners matching search criteria
    const rawStores = await prisma.user.findMany({
      where: {
        role: Role.STORE_OWNER,
        OR: search
          ? [
              { name: { contains: String(search) } },
              { address: { contains: String(search) } },
            ]
          : undefined,
      },
      include: {
        receivedRatings: true,
      },
    });

    // Map store details and calculate average rating and user's specific rating
    const stores = rawStores.map((store) => {
      const ratings = store.receivedRatings;
      const count = ratings.length;
      const avgRating = count > 0 
        ? parseFloat((ratings.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1))
        : 0;

      const userRatingObj = ratings.find((r) => r.userId === userId);
      const userSubmittedRating = userRatingObj ? userRatingObj.rating : null;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        overallRating: avgRating,
        totalRatings: count,
        userSubmittedRating,
      };
    });

    // Sort stores
    stores.sort((a, b) => {
      let valA: any = a[sortBy as keyof typeof a];
      let valB: any = b[sortBy as keyof typeof b];

      // Fallback
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

export const getStoreOwnerDashboard = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const ownerId = req.user?.id;

    if (!ownerId) {
      res.status(401).json({ status: 'error', message: 'Not authenticated' });
      return;
    }

    const { sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    // Load store details and all ratings
    const store = await prisma.user.findUnique({
      where: { id: ownerId },
      include: {
        receivedRatings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                address: true,
              },
            },
          },
        },
      },
    });

    if (!store || store.role !== Role.STORE_OWNER) {
      res.status(404).json({ status: 'error', message: 'Store not found' });
      return;
    }

    const ratings = store.receivedRatings.map((r) => ({
      id: r.id,
      rating: r.rating,
      createdAt: r.createdAt,
      user: {
        name: r.user.name,
        email: r.user.email,
        address: r.user.address,
      },
    }));

    // Calculate average rating
    const count = ratings.length;
    const avgRating = count > 0
      ? parseFloat((ratings.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1))
      : 0;

    // Sort ratings
    ratings.sort((a, b) => {
      let valA: any;
      let valB: any;

      if (sortBy === 'name') {
        valA = a.user.name.toLowerCase();
        valB = b.user.name.toLowerCase();
      } else if (sortBy === 'rating') {
        valA = a.rating;
        valB = b.rating;
      } else {
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    res.status(200).json({
      status: 'success',
      data: {
        storeName: store.name,
        averageRating: avgRating,
        totalRatings: count,
        ratings,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};
