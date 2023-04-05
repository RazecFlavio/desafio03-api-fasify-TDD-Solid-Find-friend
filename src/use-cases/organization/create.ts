import { IOrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
interface CreateOrganizationUseCaseRequest {
  contactName: string
  email: string
  zipCode: string
  address: string
  whatsapp: string
  password: string
}
interface CreateOrganizationUseCaseResponse {
  organization: Organization
}
export class CreateOrganizationUseCase {
  constructor(private repository: IOrganizationRepository) {}
  async execute({
    contactName,
    email,
    zipCode,
    address,
    whatsapp,
    password,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const _hash = await hash(password, 6)

    const organization = await this.repository.create({
      contact_name: contactName,
      email,
      zip_code: zipCode,
      address,
      whatsapp,
      hash: _hash,
    })

    return {
      organization,
    }
  }
}
