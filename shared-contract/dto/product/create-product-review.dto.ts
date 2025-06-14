import { z } from 'zod';
import { createProductReviewSchema } from '../../schemas/product';

export type CreateProductReviewDto = z.infer<typeof createProductReviewSchema>;
