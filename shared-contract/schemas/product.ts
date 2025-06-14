import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
});

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
});

export const productWithMetaSchema = productSchema.extend({
  isInCart: z.boolean().optional(),
});

export const createProductReviewSchema = z.object({
  productId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  feedback: z.string().min(1).max(1000),
});

export const productReviewSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  userId: z.string().uuid(),
  rating: z.number().int(),
  feedback: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  removedAt: z.string().nullable(),

  user: z.object({
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
  }),
});

export type Product = z.infer<typeof productSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
export type CreateProduct = z.infer<typeof createProductSchema>;
export type ProductWithMeta = z.infer<typeof productWithMetaSchema>;
export type ProductReview = z.infer<typeof productReviewSchema>;
