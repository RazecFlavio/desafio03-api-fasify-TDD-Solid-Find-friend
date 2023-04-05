import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrganizationUseCase } from './authenticate'
import { hash } from 'bcryptjs'

let repository: InMemoryOrganizationRepository
let sut: AuthenticateOrganizationUseCase

describe('Authenticate Organization UseCase', async () => {
  beforeEach(() => {
    repository = new InMemoryOrganizationRepository()
    sut = new AuthenticateOrganizationUseCase(repository)
  })

  it('should be able to authenticated with organization', async () => {
    await repository.create({
      contact_name: 'Flavio Cezar',
      email: 'email@email.com',
      address: 'endereço numero 02',
      whatsapp: '551199790999',
      zip_code: '07111-140',
      hash: await hash('123456', 6),
    })

    const { organization } = await sut.execute({
      email: 'email@email.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })
})
