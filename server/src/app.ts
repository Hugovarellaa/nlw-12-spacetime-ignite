import cors from '@fastify/cors'
import fastify from 'fastify'
import { AuthRoutes } from './routes/auth.routes'
import { MemoriesRoutes } from './routes/memories.routes'

export const app = fastify()

app.register(cors, {
	origin: '*',
})

app.register(AuthRoutes)

app.register(MemoriesRoutes, {
	prefix: '/memories',
})
