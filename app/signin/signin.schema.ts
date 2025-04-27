import { z } from "zod";

export type FormData = z.infer<typeof SchemaSignin>

export const SchemaSignin = z.object({
    email: z.string().email(),
    password_hash: z.string().min(8),
});