import keyieRequest from "@/utils/servers"

import { GatWay } from "@/const"

enum UserApi {
  PostLogin = `${GatWay.User}/login`,
  GetCurrentInfo = `${GatWay.User}/getCurrentInfo`,
}
// 登录接口
export const apiPostLogin = (data: any) => {
  return keyieRequest.post(
    {
      url: UserApi.PostLogin,
      data,
    },
    {
      useGlobalLoading: true,
      useMessage: "confirm",
    }
  )
}

// 获取用户信息接口
export const apiGetCurrentInfo = () => {
  return keyieRequest.get(
    {
      url: UserApi.GetCurrentInfo,
    },
    {
      useGlobalLoading: true,
    }
  )
}
