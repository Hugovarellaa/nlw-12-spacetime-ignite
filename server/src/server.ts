import fastify from 'fastify'
import { prisma } from './libs/prisma'

const app = fastify()

app.get('/', async () => {
	const user = await prisma.user.findMany()

	return { user }
})

app
	.listen({
		port: 3333,
	})
	.then(() => console.log('🚀🚀 Server on running in port 🚀🚀', '3333'))
