import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FetchPetsUseCase } from '../pet/fetch'

export function makeFetchPetsUseCase() {
  const repository = new PrismaPetRepository()
  const usecase = new FetchPetsUseCase(repository)

  return usecase
}
