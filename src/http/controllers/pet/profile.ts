import { makeGetProfilePetUseCase } from '@/use-cases/factories/make-get-profile-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileParamSchema = z.object({
    id: z.string(),
  })

  const { id } = profileParamSchema.parse(request.params)

  const usecase = makeGetProfilePetUseCase()

  const { pet, organization } = await usecase.execute(id)

  return {
    pet,
    organization,
  }
}
