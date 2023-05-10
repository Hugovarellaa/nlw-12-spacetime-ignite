import { app } from './app'
import { env } from './env'

app
	.listen({
		port: env.PORT,
	})
	.then(() => console.log('🚀🚀 Server on running in port 🚀🚀', env.PORT))
