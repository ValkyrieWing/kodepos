import Fuse from 'fuse.js'
import * as path from 'path'
import { routes } from './routes'
import * as fs from 'node:fs/promises'
import type { DataResult } from '../types'
import { createFullText } from '../app/helpers/kodepos'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

import province from './../data/province.json'
import city from './../data/city.json'

import district from './../data/district.json'

const load = async (app: FastifyInstance, _: FastifyPluginOptions) => {
  const text = await fs.readFile(path.resolve('data/kodepos.json'), { encoding: 'utf-8' })
  const json: DataResult[] = JSON.parse(text)

  app.decorate('district', district)
  routes(app)
}

export default load

export const fuseCity = new Fuse(city, {
  keys: ['provinceKey'],
  includeScore: false,
  threshold: 0,
  shouldSort: true,
  ignoreLocation: false,
  useExtendedSearch: false,
})
export const fuseDistrict = new Fuse(district as any, {
  keys: ['cityKey'],
  threshold: 0,
  shouldSort: true,
  ignoreLocation: false,
  useExtendedSearch: false,
  includeScore: false,
})
