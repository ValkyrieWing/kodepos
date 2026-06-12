import path from 'node:path'
import data from './kodepos.json'
import fs from 'node:fs'
const province = {}
const cities = {}
const district = {}

data.forEach((c) => {
  province[c.province] = { key: c.province, value: c.province }
  cities[c.province + c.regency] = {
    provinceKey: c.province,
    key: c.regency,
    value: c.regency,
  }
  district[c.province + c.regency + c.village] = {
    cityKey: c.regency,
    key: c.village,
    value: c.village,
    origin: c,
  }
})

const provinceValues = Object.values(province)

const provincePath = path.join(__dirname, './province.json')
const cithPath = path.join(__dirname, './city.json')
const districtPath = path.join(__dirname, './district.json')
fs.writeFileSync(districtPath, JSON.stringify(Object.values(district)))
fs.writeFileSync(provincePath, JSON.stringify(Object.values(province)))
fs.writeFileSync(cithPath, JSON.stringify(Object.values(cities)))
