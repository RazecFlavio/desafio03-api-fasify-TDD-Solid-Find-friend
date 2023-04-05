import '@fastify/jwt'
import { StringifyOptions } from 'querystring'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    organization: {
      sub: StringifyOptions
    }
  }
}
