import ConfigLocal from './config-local'
import ConfigProduction from './config-production'

let Config = {}

if ('development' === process.env.NODE_ENV) {
  Config = ConfigLocal()
} else if ('production' === process.env.NODE_ENV) {
  //handle production config
  const productionBaseUrl = '<PRODUCTION BASE URL GOES HERE>'
  Config = ConfigProduction(productionBaseUrl)
}

export default Config
