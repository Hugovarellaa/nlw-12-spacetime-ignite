import { app } from './app'

app
	.listen({
		port: 3333,
	})
	.then(() => console.log('🚀🚀 Server on running in port 🚀🚀', '3333'))
