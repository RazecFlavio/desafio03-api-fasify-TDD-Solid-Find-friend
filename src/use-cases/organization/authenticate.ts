import { IOrganizationRepository } from '@/repositories/organization-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateOrganizationUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateOrganizationUseCase {
  constructor(private repository: IOrganizationRepository) {}
  async execute({ email, password }: AuthenticateOrganizationUseCaseRequest) {
    const organization = await this.repository.findByEmail(email)
    if (!organization) throw new InvalidCredentialsError()

    const doesPasswordMatches = await compare(password, organization.hash)
    if (!doesPasswordMatches) throw new InvalidCredentialsError()

    return {
      organization,
    }
  }
}
