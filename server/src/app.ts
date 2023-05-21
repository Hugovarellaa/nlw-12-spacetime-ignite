import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastify from 'fastify'
import { resolve } from 'path'
import { env } from './env'
import { AuthRoutes } from './routes/auth.routes'
import { MemoriesRoutes } from './routes/memories.routes'
import { uploadsRoutes } from './routes/uploads.routes'

export const app = fastify()

// uploads multipart form
app.register(multipart)

// deixando pastas uploads publica para acessar via url
app.register(require('@fastify/static'), {
	root: resolve(__dirname, '..', 'uploads'),
	prefix: '/uploads',
})

app.register(cors, {
	origin: true,
})

app.register(jwt, {
	secret: env.SECRET,
})

app.register(AuthRoutes)

app.register(MemoriesRoutes, {
	prefix: '/memories',
})

app.register(uploadsRoutes, {
	prefix: '/uploads',
})
