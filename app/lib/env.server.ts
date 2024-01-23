import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]),
  IPINFO_TOKEN: z.string(),
})

export type Env = z.infer<typeof envSchema>

const env = envSchema.parse(process.env)

export default env
