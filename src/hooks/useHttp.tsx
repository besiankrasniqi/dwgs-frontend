import axios from 'axios'
import AuthenticationUtils from '../utils/AuthenticationUtils'
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
            if (AuthenticationUtils.getAuth()) {
              console.log(
                'useHttp: AuthenticationUtils.getAuth()',
                AuthenticationUtils.getAuth(),
              )
              if (AuthenticationUtils.getAuth().jwt) {
                config.headers['Authorization'] =
                  'Bearer ' + AuthenticationUtils.getAuth().jwt
              }
            }
          }

          return config
        },
        function(error) {
          return Promise.reject(error)
        },
      )

      reqInstance.interceptors.response.use(
        function(successResponse) {
          //TODO: add context to the entire app and dispatch errors globally
          return successResponse
        },

        function(errorResponse) {
          //TODO: add context to the entire app and dispatch errors globally
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
