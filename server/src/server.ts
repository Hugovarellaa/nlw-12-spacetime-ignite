import Fastify from "fastify"

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  fastify.get("/pools/count", () => {
    return { Message: "ola" }
  })

  await fastify.listen({ port: 3333, host: "0.0.0.0" })
}

bootstrap()
