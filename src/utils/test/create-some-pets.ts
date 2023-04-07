import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { CreateAndAuthenticateOrganization } from './create-and-authenticate-organization'

export async function CreateSomePets(app: FastifyInstance) {
  const { token } = await CreateAndAuthenticateOrganization(app)

  await request(app.server)
    .post('/pet')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Mili',
      description: 'Ama dar beijo, super carinhosa',
      age: 'ADULT',
      size: 'MEDIUM',
      independence: 'MEDIUM',
    })
  await request(app.server)
    .post('/pet')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Mili',
      description: 'Ama dar beijo, super carinhosa',
      age: 'PUPPY',
      size: 'SMALL',
      independence: 'LOW',
    })

  await request(app.server)
    .post('/pet')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Mili',
      description: 'Ama dar beijo, super carinhosa',
      age: 'ADULT',
      size: 'LARGE',
      independence: 'HIGH',
    })
}
