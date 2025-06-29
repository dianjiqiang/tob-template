import keyieRequest from "@/utils/servers"
import eventBus from "@/utils/eventbus"

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
      useMessage: "confirm",
    }
  )
}

// 获取用户信息接口
export const apiGetCurrentInfo = async () => {
  // 触发自定义全局Loading
  eventBus.emit("changeGlobalCustomLoading", true)

  try {
    const result = await keyieRequest.get(
      {
        url: UserApi.GetCurrentInfo,
      },
      {
        useMessage: "none",
      }
    )
    return result
  } finally {
    // 隐藏自定义全局Loading
    eventBus.emit("changeGlobalCustomLoading", false)
  }
}
