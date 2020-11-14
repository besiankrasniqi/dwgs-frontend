import axios from 'axios'
import AuthUtils from '../utils/AuthUtils'
const allowedEndpoints = ['localhost']

const useHttp = (lib: string): Function => {
  let reqInstance

  switch (lib) {
    case 'axios':
      reqInstance = axios.create()

      reqInstance.interceptors.request.use(
        function(config) {
          let allowedUrl = false

          for (const [index, item] of allowedEndpoints.entries()) {
            if (config.url.includes(item)) {
              allowedUrl = true
              break
            }
          }

          if (allowedUrl) {
            config.headers['Authorization'] =
              'Bearer ' + AuthUtils.getAuth().jwt
            // config.headers['Authorization'] = 'Bearer asdgadsggags'
          }

          return config
        },
        function(error) {
          return Promise.reject(error)
        },
      )

      reqInstance.interceptors.response.use(
        function(successResponse) {
          return successResponse
        },

        function(errorResponse) {
          console.log('Response error:', errorResponse)
          return Promise.reject(errorResponse)
        },
      )
      break

    case 'fetch':
      //TODO: add fetch request/response intereception here
      break

    default:
      //TODO: add default requst/response interception here
      break
  }

  return reqInstance
}

export default useHttp
