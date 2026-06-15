import { Response } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const submitRating = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { storeId, rating } = req.body;

    if (!userId) {
      res.status(401).json({ status: 'error', message: 'Not authenticated' });
      return;
    }

    if (!storeId || !rating) {
      res.status(400).json({ status: 'error', message: 'Missing storeId or rating' });
      return;
    }

    // Verify store exists and is a store owner
    const store = await prisma.user.findUnique({ where: { id: parseInt(storeId) } });
    if (!store || store.role !== Role.STORE_OWNER) {
      res.status(404).json({ status: 'error', message: 'Store not found' });
      return;
    }

    // Check if user already rated this store
    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId: parseInt(storeId),
        },
      },
    });

    if (existingRating) {
      res.status(400).json({
        status: 'error',
        message: 'You have already rated this store. Please modify your existing rating instead.',
      });
      return;
    }

    const newRating = await prisma.rating.create({
      data: {
        rating: parseInt(rating),
        userId,
        storeId: parseInt(storeId),
      },
    });

    res.status(201).json({
      status: 'success',
      data: newRating,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

export const modifyRating = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { storeId, rating } = req.body;

    if (!userId) {
      res.status(401).json({ status: 'error', message: 'Not authenticated' });
      return;
    }

    if (!storeId || !rating) {
      res.status(400).json({ status: 'error', message: 'Missing storeId or rating' });
      return;
    }

    // Find and update the rating
    const updatedRating = await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId,
          storeId: parseInt(storeId),
        },
      },
      update: {
        rating: parseInt(rating),
      },
      create: {
        rating: parseInt(rating),
        userId,
        storeId: parseInt(storeId),
      },
    });

    res.status(200).json({
      status: 'success',
      data: updatedRating,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};
