import { prisma } from '@/lib/prisma'
import { IOrganizationRepository } from '../organization-repository'
import { Prisma, Organization } from '@prisma/client'

export class PrismaOrganizationRepository implements IOrganizationRepository {
  async findById(id: string): Promise<Organization | null> {
    return await prisma.organization.findUnique({ where: { id } })
  }

  async findByEmail(email: string): Promise<Organization | null> {
    return await prisma.organization.findUnique({ where: { email } })
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({
      data,
    })
    return organization
  }
}
