import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { CreateOrganizationUseCase } from '../organization/create'

export function makeCreateOrganizationUseCase() {
  const repository = new PrismaOrganizationRepository()
  const usecase = new CreateOrganizationUseCase(repository)

  return usecase
}
