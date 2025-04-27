import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_BASE_URL: z.string().url()
})

const env = envSchema.parse(process.env)


declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface ProcessEnv extends z.infer<typeof envSchema> { }
    }
}

export default env