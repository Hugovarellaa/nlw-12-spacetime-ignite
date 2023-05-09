import cors from '@fastify/cors'
import fastify from 'fastify'
import { MemoriesRoutes } from './routes/memories.routes'

export const app = fastify()

app.register(cors, {
	origin: '*',
})

app.register(MemoriesRoutes, {
	prefix: '/memories',
})
