import fastify from 'fastify'
import { organizationRoutes } from './http/controllers/organization/routes'
import { ZodError } from 'zod'
import { env } from 'env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { petRoutes } from './http/controllers/pet/routes'
import { OrganizationAlreadyExists } from './use-cases/errors/organization-already-exists'

export const app = fastify()

app.register(organizationRoutes)
app.register(petRoutes)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error,', issues: error.format() })
  }

  if (error instanceof OrganizationAlreadyExists) {
    return reply.status(409).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: aqui deveriamos fazer um log para uma ferramenta externa como Datadog/newrelic/sentry
    // -> ferramenta de observabilidade
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
