import { IPetRepository } from '@/repositories/pet-repository'
import { ResourcesNotFound } from '../errors/resources-not-found'
import { IOrganizationRepository } from '@/repositories/organization-repository'

export class ProfilePetUseCase {
  constructor(
    private repository: IPetRepository,
    private orgRepository: IOrganizationRepository,
  ) {}

  async execute(petId: string) {
    const pet = await this.repository.findById(petId)
    if (!pet) throw new ResourcesNotFound()

    const organization = await this.orgRepository.findById(pet.organization_id)

    return {
      pet,
      whatsapp: organization?.whatsapp,
    }
  }
}
