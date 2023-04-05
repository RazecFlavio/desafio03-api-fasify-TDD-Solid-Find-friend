import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { CreateOrganizationUseCase } from './create'
import { describe, beforeEach, it, expect } from 'vitest'
let repository: InMemoryOrganizationRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', async () => {
  beforeEach(() => {
    repository = new InMemoryOrganizationRepository()
    sut = new CreateOrganizationUseCase(repository)
  })
  it('should be able to create a organization', async () => {
    const { organization } = await sut.execute({
      contactName: 'Flavio Cezar',
      email: 'email@email.com',
      address: 'endereço numero 02',
      whatsapp: '551199790999',
      zipCode: '07111-140',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })
})
