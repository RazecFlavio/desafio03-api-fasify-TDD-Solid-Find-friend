import { Pet, Prisma } from '@prisma/client'

export interface SearchPet {
  city: string
  age?: 'PUPPY' | 'YOUNG' | 'ADULT' | 'OLD'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  independence?: 'LOW' | 'MEDIUM' | 'HIGH'
}

export interface IPetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  search({ city, age, size, independence }: SearchPet): Promise<Pet[]>
}
