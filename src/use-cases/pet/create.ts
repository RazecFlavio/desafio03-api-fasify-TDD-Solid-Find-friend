import { IOrganizationRepository } from '@/repositories/organization-repository'
import { IPetRepository } from '@/repositories/pet-repository'
import { ResourcesNotFound } from '../errors/resources-not-found'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  city: string
  name: string
  description: string
  age: 'PUPPY' | 'YOUNG' | 'ADULT' | 'OLD'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  independence: 'LOW' | 'MEDIUM' | 'HIGH'
  organizationID: string
}
interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petRepository: IPetRepository,
    private organizationRepository: IOrganizationRepository,
  ) {}

  async execute({
    city,
    name,
    description,
    age,
    size,
    independence,
    organizationID,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organization = await this.organizationRepository.findById(
      organizationID,
    )
    if (!organization) throw new ResourcesNotFound()

    const pet = await this.petRepository.create({
      city,
      name,
      description,
      age,
      size,
      independence,
      organization_id: organizationID,
    })

    return {
      pet,
    }
  }
}
