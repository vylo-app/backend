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

export type Product = z.infer<typeof productSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
export type CreateProduct = z.infer<typeof createProductSchema>;
export type ProductWithMeta = z.infer<typeof productWithMetaSchema>;
