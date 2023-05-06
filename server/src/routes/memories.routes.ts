import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../libs/prisma'

export async function MemoriesRoutes(app: FastifyInstance) {
	// Get all memories
	app.get('/', async () => {
		const memory = await prisma.memory.findMany({
			orderBy: {
				createdAt: 'asc',
			},
		})

		const memories = memory.map((memory) => {
			return {
				id: memory.id,
				coverUrl: memory.coverUrl,
				excerpt: memory.content.substring(0, 115).concat('...'),
			}
		})

		return { memories }
	})

	// Get specific memories
	app.get('/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		const memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id,
			},
		})

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
