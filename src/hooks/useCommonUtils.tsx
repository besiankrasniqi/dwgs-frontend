import * as React from 'react'
import {useHistory} from 'react-router-dom'

interface CommonUtils {
  goToRoute(path: string): void
  calculateTimeDifferenceInSeconds(startTime: number, endTime: number): number
  secondsToHMSformat(seconds: number): string
}

const useCommonUtils = (): CommonUtils => {
  const history = useHistory()

  return {
    goToRoute(path: string) {
      history.push(path)
    },
    calculateTimeDifferenceInSeconds(startTime, endTime) {
      return +((endTime - startTime) / 1000).toFixed()
    },

    secondsToHMSformat(seconds) {
      return new Date(seconds * 1000).toISOString().substr(11, 8)
    },
  }
}

export default useCommonUtils
