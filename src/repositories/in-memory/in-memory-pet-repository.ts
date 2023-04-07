import { Prisma, Pet } from '@prisma/client'
import { SearchPet, IPetRepository } from '../pet-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetRepository implements IPetRepository {
  private items: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      independence: data.independence,
      city: data.city,
      organization_id: data.organization_id,
      created_at: new Date(),
      id: randomUUID(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)
    if (!pet) return null
    return pet
  }

  async search({ city, age, size, independence }: SearchPet): Promise<Pet[]> {
    let filteredPets = this.items.filter((item) => item.city === city)

    if (age) filteredPets = filteredPets.filter((item) => item.age === age)
    if (size) filteredPets = filteredPets.filter((item) => item.size === size)
    if (independence)
      filteredPets = filteredPets.filter(
        (item) => item.independence === independence,
      )

    return filteredPets
  }
}
