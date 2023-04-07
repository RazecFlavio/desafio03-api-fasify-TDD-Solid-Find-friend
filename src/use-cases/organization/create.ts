import { IOrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExists } from '../errors/organization-already-exists'
interface CreateOrganizationUseCaseRequest {
  contactName: string
  email: string
  zipCode: string
  address: string
  whatsapp: string
  city: string
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
    city,
    password,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const _hash = await hash(password, 6)

    const exists = await this.repository.findByEmail(email)

    if (exists) throw new OrganizationAlreadyExists()

    const organization = await this.repository.create({
      contact_name: contactName,
      email,
      zip_code: zipCode,
      address,
      whatsapp,
      city,
      hash: _hash,
    })

    return {
      organization,
    }
  }
}
