import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { CreateAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Create Pet (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet organization', async () => {
    const { token } = await CreateAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Mili',
        description: 'Ama dar beijo, super carinhosa',
        age: 'ADULT',
        size: 'MEDIUM',
        independence: 'LOW',
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.pet.id).toEqual(expect.any(String))
  })
})
