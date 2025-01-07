import KeyieRequest from "./request"
import { statusCode } from "@/const/modules/statusCode"

import { BASE_URL, TIME_OUT } from "./config"
import eventBus from "../eventbus"
import { statusOperation } from "./statusOperation"

import type { KeyieRequestConfigOption } from "./type"
import type { AxiosRequestConfig } from "axios"

interface ResultDataType {
  code: number
  data: any
  msg: string
}

interface KeyieAxiosRequestConfigType extends AxiosRequestConfig<any> {
  keyieOptions?: KeyieRequestConfigOption
}

const keyieRequest = new KeyieRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    onFulfilled: (config: KeyieAxiosRequestConfigType) => {
      const { timeout = BASE_URL, useGlobalLoading = false } = config.keyieOptions ? config.keyieOptions : {}
      if (useGlobalLoading) {
        eventBus.emit("changeGlobLoading", true)
      }
      config.timeout = timeout

      return config
    },
    onFulfilledRes: (res: ResultDataType | any) => {
      const { status } = res
      if (status !== 200) {
        return
      } else {
        const { data, config } = res
        const { msg, code } = data
        const {
          useMessage = "none",
          innerTrycatch = false,
          resultToJSON = false,
          useGlobalLoading = false,
          resultToParse = false,
        } = config.keyieOptions ? config.keyieOptions : {}
        if (useGlobalLoading) {
          eventBus.emit("changeGlobLoading", false)
        }
        if (code !== statusCode.SUCCESS) {
          statusOperation(code, useMessage, msg)
          if (innerTrycatch) {
            return Promise.reject(data.data)
          }
          throw Error(msg)
        }
        if (resultToJSON) {
          return JSON.stringify(data.data)
        }
        if (resultToParse) {
          return JSON.parse(data.data)
        }
        return data.data
      }
    },
    onRejectedRes: (error) => {
      return error
    },
  },
})

export default keyieRequest
