import { fuseCity, fuseDistrict } from '../../start/core'
import { SearchQueries } from '../../types'
import { createSpecResponse, sendBadRequest } from '../helpers/spec'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import districtData from '../../data/province.json'
export const search = (app: FastifyInstance) => {
  return async (request: FastifyRequest<{ Querystring: SearchQueries }>, reply: FastifyReply) => {
    const { q, province, city } = request.query
    // TODO: search by province, regency, or district

    let data
    if (province) {
      data = fuseCity.search(province).map((c) => ({ ...(c['item'] as object) }))
    } else if (city) {
      data = fuseDistrict.search(city).map((c) => ({ ...(c['item'] as object) }))
    } else {
      data = districtData
    }

    const response = createSpecResponse(data)

    reply.header('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
    return reply.send(response)
  }
}
