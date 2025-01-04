import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { KeyieRequestConfig,KeyieRequestConfigOption } from './type'

export class KeyieRequest {
  instance: AxiosInstance

  // request实例 => axios的实例
  constructor(config: KeyieRequestConfig) {
    this.instance = axios.create(config)

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 给每个响应头加上token
        config.data = { token: 'xxx' }

        console.log('请求成功的拦截')
        return config
      },
      (err) => {
        console.log('请求失败的拦截')
        return err
      }
    )
    // 全局结果拦截器
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    //添加局部拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.onFulfilled as any,
      config.interceptors?.onRejected
    )
    this.instance.interceptors.response.use(
      config.interceptors?.onFulfilledRes,
      config.interceptors?.onRejectedRes
    )
  }

  // 封装网络请求的方法
  request<T = any>(config: KeyieRequestConfig<T>, options?: KeyieRequestConfigOption) {
    if (config.interceptors?.onFulfilled) {
      config = config.interceptors.onFulfilled(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.onFulfilledRes) {
            res = config.interceptors.onFulfilledRes(res, options)
          }
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }
  get<T = any>(config: KeyieRequestConfig<T>, options?: KeyieRequestConfigOption) {
    return this.request({ ...config, method: 'GET' }, options)
  }
  put<T = any>(config: KeyieRequestConfig<T>, options?: KeyieRequestConfigOption) {
    return this.request({ ...config, method: 'PUT' }, options)
  }
  post<T = any>(config: KeyieRequestConfig<T>, options?: KeyieRequestConfigOption) {
    return this.request({ ...config, method: 'POST' }, options)
  }
  delete<T = any>(config: KeyieRequestConfig<T>, options?: KeyieRequestConfigOption) {
    return this.request({ ...config, method: 'DELETE' }, options)
  }
  patch<T = any>(config: KeyieRequestConfig<T>, options?: KeyieRequestConfigOption) {
    return this.request({ ...config, method: 'PATCH' }, options)
  }
}

export default KeyieRequest