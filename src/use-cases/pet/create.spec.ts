import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { randomUUID } from 'crypto'
import { hash } from 'bcryptjs'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: CreatePetUseCase

describe('', async () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreatePetUseCase(petRepository, organizationRepository)
  })

  it('should be able to create a pet', async () => {
    const organization = await organizationRepository.create({
      id: randomUUID(),
      address: 'Endereço 1',
      city: 'cidade',
      contact_name: 'contato',
      email: 'email@email.com.br',
      hash: await hash('1234', 6),
      whatsapp: '123412341',
      zip_code: '234523452',
      created_at: new Date(),
    })
    const { pet } = await sut.execute({
      city: 'cidade',
      name: 'cachorrinho',
      description: 'peludinho e fofo',
      age: 'PUPPY',
      independence: 'LOW',
      size: 'SMALL',
      organizationID: organization.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
