import qs from 'node:querystring'
import { SearchQueries } from '../../types'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const home = async (
  request: FastifyRequest<{ Querystring: SearchQueries }>,
  reply: FastifyReply
) => {
  const { q } = request.query
  reply.send("hello")

}
