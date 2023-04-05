import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { AuthenticateOrganizationUseCase } from '../organization/authenticate'

export function makeAuthenticateOrganizationUseCase() {
  const repository = new PrismaOrganizationRepository()
  const usecase = new AuthenticateOrganizationUseCase(repository)

  return usecase
}
