import type { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface keyieRequestType<T = AxiosResponse> {
  onFulfilled?: (config: AxiosRequestConfig<any>, options?: KeyieRequestConfig) => AxiosRequestConfig<any>
  onRejected?: (error: any) => any
  onFulfilledRes?: (res: T, options?: KeyieRequestConfig) => T
  onRejectedRes?: (error: any) => any
}

export interface KeyieRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: keyieRequestType<T>
}

export type KeyieUseMessageType = 'none' | 'message' | 'notification' | 'confirm'

export interface KeyieRequestConfigOption {
  useMessage?: KeyieUseMessageType
  useGlobalLoading?: boolean
  timeout?: number
  innerTrycatch?: boolean
  resultToJSON?: boolean
  resultToParse?: boolean
}