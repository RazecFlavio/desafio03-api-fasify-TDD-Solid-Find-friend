import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { fetch } from './fetch'
import { profile } from './profile'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pet/:city', fetch)
  app.get('/profile/:id', profile)

  app.post('/pet', { onRequest: [verifyJWT] }, create)
}
