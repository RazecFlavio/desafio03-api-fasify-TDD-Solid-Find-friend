import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Organization (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate as organization', async () => {
    await request(app.server).post('/organization').send({
      contactName: 'Flavio Cezar',
      email: 'fcezar@gmail.com',
      zipCode: '07111-140',
      address: 'Rua Francisco Rodrigues Gasques, 58 - apt 22 C',
      whatsapp: '5511997907394',
      city: 'guarulhos',
      password: '123456',
    })
    const response = await request(app.server).post('/session').send({
      email: 'fcezar@gmail.com',
      password: '123456',
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
