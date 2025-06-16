import { z } from 'zod';

export const favoriteSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  productId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  removedAt: z.string().datetime().nullable().optional(),
});

export type Favorite = z.infer<typeof favoriteSchema>;
