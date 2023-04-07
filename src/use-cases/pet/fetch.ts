import { SearchPet, IPetRepository } from '@/repositories/pet-repository'

interface FetchPetsUseCaseRequest extends SearchPet {}

export class FetchPetsUseCase {
  constructor(private repository: IPetRepository) {}

  async execute({ city, age, independence, size }: FetchPetsUseCaseRequest) {
    const pets = await this.repository.search({ city, age, independence, size })

    return { pets }
  }
}
