import fastify from 'fastify'
import { MemoriesRoutes } from './routes/memories.routes'

export const app = fastify()

app.register(MemoriesRoutes, {
	prefix: '/memories',
})
