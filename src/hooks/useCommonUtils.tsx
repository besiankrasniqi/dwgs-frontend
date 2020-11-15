import * as React from 'react'
import {useHistory} from 'react-router-dom'

interface CommonUtils {
  goToRoute(path: string): void
}

const useCommonUtils = (): CommonUtils => {
  const history = useHistory()

  return {
    goToRoute(path: string) {
      history.push(path)
    },
  }
}

export default useCommonUtils
