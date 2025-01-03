import {SettingOutlined} from '@ant-design/icons'
import {Navigate} from 'react-router-dom'
import {lazy} from 'react'

const UserInfo = lazy(() => import('@/views/system/user-info'))
const SystemSetting = lazy(() => import('@/views/system/system-setting'))

const routes = {
  path: '/system',
  name: 'System',
  label: '系统管理',
  icon: <SettingOutlined />,
  element: <Navigate to="/system/user-info" />,
  // rules: ['system-manage'],
  children: [
    {
      path: '/system/user-info',
      name: 'UserInfo',
      label: '个人信息',
      element: <UserInfo></UserInfo>,
      // rules: ['system-manage'],
    },
    {
      path: '/system/system-setting',
      name: 'SystemSetting',
      label: '系统设置',
      element: <SystemSetting></SystemSetting>,
      // rules: ['system-manage'],
    },
  ]
}

export default routes