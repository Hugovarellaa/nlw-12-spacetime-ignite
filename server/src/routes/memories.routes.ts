import { FastifyInstance } from 'fastify'
import { prisma } from '../libs/prisma'

export async function MemoriesRoutes(app: FastifyInstance) {
	// Get all memories
	app.get('/', async () => {
		const memory = await prisma.memory.findMany()

		return { memory }
	})

	// Get specific memories
	app.get('/:id', async () => {
		const memory = await prisma.memory.findMany()

		return { memory }
	})

	// Create  memories
	app.post('/', async () => {
		const memory = await prisma.memory.findMany()

		return { memory }
	})

	// Update all memories
	app.put('/:id', async () => {
		const memory = await prisma.memory.findMany()

		return { memory }
	})

	// Delete  memories
	app.delete('/', async () => {
		const memory = await prisma.memory.findMany()

		return { memory }
	})
}
