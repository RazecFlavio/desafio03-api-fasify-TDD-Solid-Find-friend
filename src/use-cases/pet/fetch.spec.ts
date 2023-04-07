import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsUseCase } from './fetch'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { randomUUID } from 'node:crypto'
import { hash } from 'bcryptjs'

let organizationRepository: InMemoryOrganizationRepository
let repository: InMemoryPetRepository
let sut: FetchPetsUseCase

describe('Fetch Pet Use Case', async () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    repository = new InMemoryPetRepository()
    sut = new FetchPetsUseCase(repository)

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
    await repository.create({
      city: 'cidade1',
      name: 'cachorrinho',
      description: 'peludinho e fofo',
      age: 'PUPPY',
      independence: 'LOW',
      size: 'SMALL',
      organization_id: organization.id,
    })
    await repository.create({
      city: 'cidade1',
      name: 'cachorrinho',
      description: 'peludinho e fofo',
      age: 'OLD',
      independence: 'HIGH',
      size: 'SMALL',
      organization_id: organization.id,
    })
    await repository.create({
      city: 'cidade2',
      name: 'cachorrinho',
      description: 'peludinho e fofo',
      age: 'PUPPY',
      independence: 'LOW',
      size: 'LARGE',
      organization_id: organization.id,
    })
    await repository.create({
      city: 'cidade2',
      name: 'cachorrinho',
      description: 'peludinho e fofo',
      age: 'PUPPY',
      independence: 'MEDIUM',
      size: 'MEDIUM',
      organization_id: organization.id,
    })
  })
  it('should be able to list pet from a city', async () => {
    const { pets } = await sut.execute({ city: 'cidade1' })
    expect(pets).toHaveLength(2)
  })
  it('should be able to search by pets by size', async () => {
    const { pets } = await sut.execute({ city: 'cidade2', size: 'LARGE' })
    expect(pets).toHaveLength(1)
  })
  it('should be able to search by pets by independence', async () => {
    const { pets } = await sut.execute({
      city: 'cidade1',
      independence: 'HIGH',
    })
    expect(pets).toHaveLength(1)
  })
  it('should be able to search by pets by age', async () => {
    const { pets } = await sut.execute({
      city: 'cidade2',
      age: 'PUPPY',
    })
    expect(pets).toHaveLength(2)
  })
})
