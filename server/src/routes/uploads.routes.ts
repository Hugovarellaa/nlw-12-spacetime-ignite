import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import { extname, resolve } from 'node:path'

import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

export async function uploadsRoutes(app: FastifyInstance) {
	app.post('/', async (request, reply) => {
		const upload = await request.file({
			limits: {
				fileSize: 5_242_880, // 5mb
			},
		})

		if (!upload) {
			return reply.status(400).send()
		}

		const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
		const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

		if (!isValidFileFormat) {
			return reply.status(400).send()
		}

		const fileId = randomUUID()
		const extension = extname(upload.filename)
		const fileName = fileId.concat(extension)

		const writeStream = fs.createWriteStream(
			resolve(__dirname, '..', '..', 'uploads', fileName),
		)

		// Amazon S3, Google GCS, CloudFlare R2
		const pump = promisify(pipeline)
		await pump(upload.file, writeStream)
		const fullUrl = request.protocol.concat('://').concat(request.hostname)
		const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

		return { fileUrl }
	})
}
