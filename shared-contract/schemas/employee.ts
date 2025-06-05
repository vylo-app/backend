import { z } from 'zod';

export const employeeSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export type Employee = z.infer<typeof employeeSchema>;
