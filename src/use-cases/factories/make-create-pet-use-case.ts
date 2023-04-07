import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetUseCase } from '../pet/create'
import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'

export function makeCreatePetUseCase() {
  const repository = new PrismaPetRepository()
  const organizationRepository = new PrismaOrganizationRepository()
  const usecase = new CreatePetUseCase(repository, organizationRepository)

  return usecase
}
