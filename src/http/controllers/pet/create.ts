import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { city, sub: organizationID } = request.user

  const createPetBodySchema = z.object({
    name: z.string().min(3),
    description: z.string(),
    age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'OLD']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  })

  const { name, description, age, size, independence } =
    createPetBodySchema.parse(request.body)

  const usecase = makeCreatePetUseCase()

  const { pet } = await usecase.execute({
    name,
    description,
    age,
    size,
    independence,
    city,
    organizationID,
  })

  return reply.status(201).send({ pet })
}
