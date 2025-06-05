import { z } from 'zod';

export const organizationSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
});

export type Organization = z.infer<typeof organizationSchema>;
