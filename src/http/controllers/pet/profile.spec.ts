import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { CreateAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Get Profile (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet profile', async () => {
    const { token } = await CreateAndAuthenticateOrganization(app)

    const petResponse = await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Mili',
        description: 'Ama dar beijo, super carinhosa',
        age: 'ADULT',
        size: 'MEDIUM',
        independence: 'MEDIUM',
      })

    const response = await request(app.server).get(
      `/profile/${petResponse.body.pet.id}`,
    )
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Mili',
      }),
    )
  })
})
