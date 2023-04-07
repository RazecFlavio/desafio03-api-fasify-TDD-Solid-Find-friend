import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { CreateOrganizationUseCase } from './create'
import { describe, beforeEach, it, expect } from 'vitest'
import { OrganizationAlreadyExists } from '../errors/organization-already-exists'
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
      city: 'cidade',
      zipCode: '07111-140',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })
  it('should be not able to create a organization with the same email', async () => {
    await sut.execute({
      contactName: 'Flavio Cezar',
      email: 'email@email.com',
      address: 'endereço numero 02',
      whatsapp: '551199790999',
      city: 'cidade',
      zipCode: '07111-140',
      password: '123456',
    })
    await expect(async () => {
      await sut.execute({
        contactName: 'Flavio Cezar',
        email: 'email@email.com',
        address: 'endereço numero 02',
        whatsapp: '551199790999',
        city: 'cidade',
        zipCode: '07111-140',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(OrganizationAlreadyExists)
  })
})
