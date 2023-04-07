import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAndAuthenticateOrganization(app: FastifyInstance) {
  await request(app.server).post('/organization').send({
    contactName: 'Flavio Cezar',
    email: 'fcezar@gmail.com',
    zipCode: '07111-140',
    address: 'Rua Francisco Rodrigues Gasques, 58 - apt 22 C',
    whatsapp: '5511997907394',
    city: 'cidade1',
    password: '123456',
  })
  const authResponse = await request(app.server).post('/session').send({
    email: 'fcezar@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
