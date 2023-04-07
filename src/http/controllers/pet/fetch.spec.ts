import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { CreateSomePets } from '@/utils/test/create-some-pets'

describe('Fetch pets (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
    await CreateSomePets(app)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets from a city', async () => {
    const response = await request(app.server).post('/pet/cidade1').send({})
    expect(response.body.pets).toHaveLength(3)
  })
  it('should be able to fetch pets from a age', async () => {
    const response = await request(app.server)
      .post('/pet/cidade1')
      .send({ age: 'ADULT' })

    expect(response.body.pets).toHaveLength(2)
  })
  it('should be able to fetch pets from a size', async () => {
    const response = await request(app.server)
      .post('/pet/cidade1')
      .send({ size: 'LARGE' })

    expect(response.body.pets).toHaveLength(1)
  })
  it('should be able to fetch pets from a independence', async () => {
    const response = await request(app.server)
      .post('/pet/cidade1')
      .send({ independence: 'MEDIUM' })

    expect(response.body.pets).toHaveLength(1)
  })
})
