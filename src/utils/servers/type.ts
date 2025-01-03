import type { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface keyieRequestType<T = AxiosResponse> {
  onFulfilled?: (config: AxiosRequestConfig<any>) => AxiosRequestConfig<any>
  onRejected?: (error: any) => any
  onFulfilledRes?: (res: T) => T
  onRejectedRes?: (error: any) => any
}

export interface KeyieRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: keyieRequestType<T>
}