import {BASE_URL, TIME_OUT} from './config'
import type { KeyieRequestConfigOption } from './type'
import KeyieRequest from './request'
import { statusCode } from '@/const/modules/statusCode';

import { statusOperation } from './statusOperation';

interface ResultDataType {
  code: number,
  data: any,
  msg: string,
}

const baseOption: KeyieRequestConfigOption = {
  useMessage: 'none',
  useGlobalLoading: false,
  timeout: BASE_URL,
  innerTrycatch: false,
  resultToJSON: false,
  resultToParse: false
}

const keyieRequest = new KeyieRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    onFulfilledRes(res: ResultDataType | any, options: KeyieRequestConfigOption = baseOption) {
      const {code, msg} = res
      const {
        useMessage = 'none',
        useGlobalLoading = false,
        innerTrycatch = false,
        resultToJSON = false,
        resultToParse = false
      } = options
      
      if (code !== statusCode.SUCCESS) {
        statusOperation(code, useMessage, msg)
        if (innerTrycatch) {
          return Promise.reject(res)
        }
      }
      if (resultToJSON) {
        return JSON.stringify(res.data)
      }
      if (resultToParse) {
        return JSON.parse(res.data)
      }
      return res.data
    },
    onRejectedRes(error) {
      console.log(error);
      
    },
  }
})

export default keyieRequest
