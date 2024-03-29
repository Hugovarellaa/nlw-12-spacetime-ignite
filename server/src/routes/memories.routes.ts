import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../libs/prisma'

export async function MemoriesRoutes(app: FastifyInstance) {
	app.addHook('preHandler', async (request) => {
		await request.jwtVerify()
	})

	// Get all memories
	app.get('/', async (request) => {
		const memories = await prisma.memory.findMany({
			where: {
				userId: request.user.sub,
			},
			orderBy: {
				createdAt: 'asc',
			},
		})

		return memories.map((memory) => {
			return {
				id: memory.id,
				coverUrl: memory.coverUrl,
				excerpt: memory.content.substring(0, 115).concat('...'),
				createdAt: memory.createdAt,
			}
		})
	})

	// Get specific memories
	app.get('/:id', async (request, reply) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		const memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id,
			},
		})

		if (!memory.isPublic && memory.userId !== request.user.sub) {
			return reply.status(401).send({ message: 'Unauthorized' })
		}

		return { memory }
	})

	// Create  memories
	app.post('/', async (request, reply) => {
		const bodySchema = z.object({
			content: z.string(),
			coverUrl: z.string(),
			isPublic: z.coerce.boolean().default(false),
			// false = 0 , null , undefined, ''
			// true = 1 , 'qualquerString'
		})

		const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

		const memory = await prisma.memory.create({
			data: {
				content,
				coverUrl,
				isPublic,
				userId: request.user.sub,
			},
		})

		return reply.status(201).send(memory)
	})

	// Update all memories
	app.put('/:id', async (request, reply) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		const bodySchema = z.object({
			content: z.string(),
			coverUrl: z.string(),
			isPublic: z.coerce.boolean().default(false),
			// false = 0 , null , undefined, ''
			// true = 1 , 'qualquerString'
		})

		const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

		let memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id,
			},
		})

		if (memory.userId !== request.user.sub) {
			return reply.status(401).send({ message: 'Unauthorized' })
		}

		memory = await prisma.memory.update({
			where: {
				id,
			},
			data: {
				content,
				coverUrl,
				isPublic,
			},
		})

		return reply.status(201).send(memory)
	})

	// Delete  memories
	app.delete('/:id', async (request, reply) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		const memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id,
			},
		})

		if (memory.userId !== request.user.sub) {
			return reply.status(401).send({ message: 'Unauthorized' })
		}

		await prisma.memory.delete({
			where: {
				id,
			},
		})

		return reply.status(204).send()
	})
}
