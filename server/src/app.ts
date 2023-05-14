import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { AuthRoutes } from './routes/auth.routes'
import { MemoriesRoutes } from './routes/memories.routes'

export const app = fastify()

app.register(cors, {
	origin: '*',
})

app.register(jwt, {
	secret: env.SECRET,
})

app.register(AuthRoutes)

app.register(MemoriesRoutes, {
	prefix: '/memories',
})
