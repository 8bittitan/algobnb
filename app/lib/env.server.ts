import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]),
  IPINFO_TOKEN: z.string(),
  DEFAULT_LATITUDE: z.number({ coerce: true }).optional(),
  DEFAULT_LONGITUDE: z.number({ coerce: true }).optional(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
})

export type Env = z.infer<typeof envSchema>

const env = envSchema.parse(process.env)

export default env
