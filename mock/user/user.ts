import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/basic-api/user-server/getCurrentInfo',
    method: 'get',
    response: () => {
      return {
        code: 500,
        msg: '服务器链接错误'
        // data: {
        //   name: 'react-admin',
        //   age: 18,
        // },
      }
    },
  },
] as MockMethod[]
