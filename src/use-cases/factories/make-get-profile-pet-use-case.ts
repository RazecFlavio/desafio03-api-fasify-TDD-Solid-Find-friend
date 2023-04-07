import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { ProfilePetUseCase } from '../pet/profile'

export function makeGetProfilePetUseCase() {
  const repository = new PrismaPetRepository()
  const usecase = new ProfilePetUseCase(repository)

  return usecase
}
