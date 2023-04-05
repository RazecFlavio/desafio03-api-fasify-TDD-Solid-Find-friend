import { randomUUID } from 'node:crypto'
import { IOrganizationRepository } from '../organization-repository'
import { Prisma, Organization } from '@prisma/client'

export class InMemoryOrganizationRepository implements IOrganizationRepository {
  private items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization: Organization = {
      contact_name: data.contact_name,
      email: data.email,
      address: data.address,
      whatsapp: data.whatsapp,
      zip_code: data.zip_code,
      hash: data.hash,
      created_at: new Date(),
      id: randomUUID(),
    }
    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) return null
    return organization
  }
}
