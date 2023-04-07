import { Prisma, Pet } from '@prisma/client'
import { IPetRepository, SearchPet } from '../pet-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements IPetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })
    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    return await prisma.pet.findUnique({ where: { id } })
  }

  async search({ city, age, size, independence }: SearchPet): Promise<Pet[]> {
    return await prisma.pet.findMany({
      where: {
        city,
        age,
        size,
        independence,
      },
    })
  }
}
