import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	DATABASE_URL: z.string(),
	GITHUB_ID: z.string(),
	GITHUB_SECRET: z.string(),
	PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error('❌❌ environment variable failed', _env.error.format())
	throw new Error('❌❌ environment variable failed')
}

export const env = _env.data
