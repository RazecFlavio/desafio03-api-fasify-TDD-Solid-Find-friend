import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchParamSchema = z.object({
    city: z.string(),
  })
  const { city } = fetchParamSchema.parse(request.params)

  const usecase = makeFetchPetsUseCase()

  if (request.body) {
    const fetchBodySchema = z.object({
      age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'OLD']).nullish(),
      size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).nullish(),
      independence: z.enum(['LOW', 'MEDIUM', 'HIGH']).nullish(),
    })
    const { age, size, independence } = fetchBodySchema.parse(request.body)

    const { pets } = await usecase.execute({
      city,
      age: age || undefined,
      size: size || undefined,
      independence: independence || undefined,
    })
    return reply.status(200).send({ pets })
  }

  const { pets } = await usecase.execute({
    city,
  })

  return reply.status(200).send({ pets })
}
