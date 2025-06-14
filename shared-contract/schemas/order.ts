import { z } from 'zod';

export const productInOrderSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
});

export const orderItemSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  productId: z.string().uuid(),
  product: productInOrderSchema,
});

export const orderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  amount: z.number(),
  totalPrice: z.number(),
  items: z.array(orderItemSchema),
});

export type Order = z.infer<typeof orderSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type ProductInOrder = z.infer<typeof productInOrderSchema>;
