import { MockMethod } from "vite-plugin-mock"
export default [
  {
    url: `/basic-api/user-server/login`,
    method: "post",
    timeout: 2000,
    response: (params: any) => {
      const { username, password } = params.body
      if (username === "keyie" && password === "yuyubaobao") {
        return {
          code: 200,
          data: {
            token: "this is yuyubaobao token" + Math.random() * 100,
          },
        }
      } else {
        return {
          code: -1,
          msg: "用户名或密码错误",
        }
      }
    },
  },
  {
    url: "/basic-api/user-server/getCurrentInfo",
    method: "get",
    timeout: 2000,
    response: () => {
      return {
        code: 200,
        data: {
          name: "keyie",
          permissions: ["app_btn_ag_geAcSetting", "app_btn_ag_geFunctionSetting", "app_btn_ag_geGeSetting"],
          email: "keyie@keyie.com",
          phone: "13800138000",
          role: "admin",
          department: "admin",
          position: "admin",
          status: "active",
          createTime: "2021-01-01",
          updateTime: "2021-01-01",
        },
      }
    },
  },
] as MockMethod[]
