import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    contactName: z.string().min(3),
    email: z.string().email(),
    zipCode: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    password: z.string(),
  })

  const { contactName, email, zipCode, address, whatsapp, password } =
    createBodySchema.parse(request.body)

  const usecase = makeCreateOrganizationUseCase()

  const { organization } = await usecase.execute({
    contactName,
    email,
    zipCode,
    address,
    whatsapp,
    password,
  })

  return reply.status(201).send({ organization })
}
