const axios = require('axios')

const API_URL = 'https://api.mocklets.com/p68140/properties'


// Get the Data information from the API
const getPropertiesData = async () => {
  const response = await axios.get(API_URL)

  if (response && response.data.length > 0) {
    return response.data
  }
}


const getPropertyByName = (data, name) => {
  let property

  if (data && data.length > 0) {
    property = data.find(prop => prop.name === name)
    // console.log(`property`, property)
  }

  if (property) return property

  return { msg: 'Property not found' }
}


const getPropertiesByType = (data, propertiesTypes) => {
  let resultProperties = []
  if (Array.isArray(propertiesTypes) && propertiesTypes.length > 0) {

    propertiesTypes.forEach(type => {
      if (data && data.length > 0) {
        let filter = data.filter(prop => prop.type === type)
        resultProperties.push(...filter)
        // console.log(`property`, property)
      }
    })
    return resultProperties
  }

  return { msg: 'Properties not found' }
}


const getPropertiesByFacilites = (data, facilites) => {
  let resultProperties = []
  if (Array.isArray(facilites) && facilites.length > 0) {

    facilites.forEach(fac => {
      if (data && data.length > 0) {
        let filter = data.filter(prop => prop.facilites.includes(fac))
        resultProperties.push(...filter)
        // console.log(`property`, property)
      }
    })
    return resultProperties
  }

  return { msg: 'Properties not found' }
}


const getSummary = data => {

  let summary = {
    propertyType: {},
    faciliteType: {}
  }

  summary.totalProperties = data.length

  let types = data.map(prop => prop.type)
  let facilites = data.map(prop => prop.facilites).flat()

  const setTypes = new Set(types)
  const setFacilites = new Set(facilites)

  summary.types = setTypes.size
  summary.facilites = setFacilites.size

  setTypes.forEach(type => {
    summary.propertyType[type] = data.filter(prop => prop.type === type).length
  })

  setFacilites.forEach(facilite => {
    summary.faciliteType[facilite] = data.filter(prop => prop.facilites.includes(facilite)).length
  })

  return summary
}

async function main() {
  const DATA = await getPropertiesData()
  let result
  let summary

  result = getPropertyByName(DATA, 'Property 4')
  if (result && !result.msg) {
    console.log('Property by Name', result)
  } else {
    console.log(result.msg)
  }

  result = getPropertiesByType(DATA, ['Loft', 'dog'])
  if (result && !result.msg) {
    console.log('Property by Types', result)
  } else {
    console.log(result.msg)
  }

  result = getPropertiesByFacilites(DATA, ['Free parking on premises'])
  if (result && !result.msg) {
    console.log('Property by Facilites', result)
  } else {
    console.log(result.msg)
  }

  summary = getSummary(DATA)

  console.log('Summary', summary)

}


main()
