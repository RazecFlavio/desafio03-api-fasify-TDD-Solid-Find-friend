import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateOrganizationUseCase } from '@/use-cases/factories/make-authenticate-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticaBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticaBodySchema.parse(request.body)

  try {
    const usecase = makeAuthenticateOrganizationUseCase()
    const { organization } = await usecase.execute({ email, password })
    const token = await reply.jwtSign(
      {
        city: organization.city,
      },
      {
        sign: {
          sub: organization.id,
        },
      },
    )
    const refreshToken = await reply.jwtSign(
      {
        city: organization.city,
      },
      {
        sign: { sub: organization.id },
      },
    )
    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError)
      return reply.status(400).send({ message: error.message })
    throw error
  }
}
