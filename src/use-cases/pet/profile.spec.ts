import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ProfilePetUseCase } from './profile'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: ProfilePetUseCase

describe('Get Pet Profile Use Case', async () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository()
    sut = new ProfilePetUseCase(petRepository, organizationRepository)
  })

  it('should be able to get pet profile', async () => {
    const organization = await organizationRepository.create({
      contact_name: 'Flavio Cezar',
      email: 'email@email.com',
      address: 'endereço numero 02',
      whatsapp: '551199790999',
      city: 'cidade',
      zip_code: '07111-140',
      hash: await hash('123456', 6),
      created_at: new Date(),
      id: randomUUID(),
    })

    const pet = await petRepository.create({
      name: 'cachorrinho',
      description: 'peludinho e fofo',
      age: 'PUPPY',
      independence: 'LOW',
      size: 'SMALL',
      city: 'cidade',
      organization_id: organization.id,
    })

    const profile = await sut.execute(pet.id)

    expect(profile.pet.name).toEqual('cachorrinho')
  })
})
