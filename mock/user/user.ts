import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/basic-api/user-system/getUserInfo',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          name: 'react-admin',
          age: 18,
        },
      }
    },
  },
] as MockMethod[]
