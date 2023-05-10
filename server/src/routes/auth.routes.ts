import axios from 'axios'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { env } from '../env'
import { prisma } from '../libs/prisma'

export async function AuthRoutes(app: FastifyInstance) {
	app.post('/sessions', async (request) => {
		const bodySchema = z.object({
			code: z.string(),
		})

		const { code } = bodySchema.parse(request.body)

		const accessTokenResponse = await axios.post(
			'https://github.com/login/oauth/access_token',
			null,
			{
				params: {
					code,
					client_id: env.GITHUB_ID,
					client_secret: env.GITHUB_SECRET,
				},
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		)

		const { access_token } = accessTokenResponse.data

		const userResponse = await axios.get('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})

		const userSchema = z.object({
			id: z.number(),
			login: z.string(),
			name: z.string(),
			avatar_url: z.string().url(),
		})

		const userInfo = userSchema.parse(userResponse.data)

		let user = await prisma.user.findUnique({
			where: {
				githubId: userInfo.id,
			},
		})

		if (!user) {
			user = await prisma.user.create({
				data: {
					githubId: userInfo.id,
					login: userInfo.login,
					name: userInfo.name,
					avatarUrl: userInfo.avatar_url,
				},
			})
		}

		return { user }
	})
}
