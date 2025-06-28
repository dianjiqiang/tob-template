import keyieRequest from "@/utils/servers"
import { GatWay } from "@/const"

enum UserInfoApi {
  UpdateUserInfo = `${GatWay.User}/updateUserInfo`,
  ChangePassword = `${GatWay.User}/changePassword`,
  BindPhone = `${GatWay.User}/bindPhone`,
  BindEmail = `${GatWay.User}/bindEmail`,
  UploadAvatar = `${GatWay.User}/uploadAvatar`,
  GetLoginHistory = `${GatWay.User}/getLoginHistory`,
}

// 更新用户信息
export const apiUpdateUserInfo = (data: any) => {
  return keyieRequest.put(
    {
      url: UserInfoApi.UpdateUserInfo,
      data,
    },
    {
      useGlobalLoading: true,
      useMessage: "confirm",
    }
  )
}

// 修改密码
export const apiChangePassword = (data: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
  return keyieRequest.put(
    {
      url: UserInfoApi.ChangePassword,
      data,
    },
    {
      useGlobalLoading: true,
      useMessage: "confirm",
    }
  )
}

// 绑定手机
export const apiBindPhone = (data: { phone: string; verifyCode: string }) => {
  return keyieRequest.post(
    {
      url: UserInfoApi.BindPhone,
      data,
    },
    {
      useGlobalLoading: true,
      useMessage: "confirm",
    }
  )
}

// 绑定邮箱
export const apiBindEmail = (data: { email: string; verifyCode: string }) => {
  return keyieRequest.post(
    {
      url: UserInfoApi.BindEmail,
      data,
    },
    {
      useGlobalLoading: true,
      useMessage: "confirm",
    }
  )
}

// 上传头像
export const apiUploadAvatar = (file: File) => {
  const formData = new FormData()
  formData.append("avatar", file)

  return keyieRequest.post(
    {
      url: UserInfoApi.UploadAvatar,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    {
      useGlobalLoading: true,
      useMessage: "confirm",
    }
  )
}

// 获取登录历史
export const apiGetLoginHistory = (params: {
  page: number
  pageSize: number
  startDate?: string
  endDate?: string
}) => {
  return keyieRequest.get(
    {
      url: UserInfoApi.GetLoginHistory,
      params,
    },
    {
      useGlobalLoading: false,
    }
  )
}
