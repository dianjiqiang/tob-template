import {SettingOutlined} from '@ant-design/icons'
import {Navigate} from 'react-router-dom'
import {lazy} from 'react'
import { rules } from '@/const'

const UserInfo = lazy(() => import('views/system/user-info'))
const SystemSetting = lazy(() => import('views/system/system-setting'))

const routes = {
  path: '/system',
  name: 'System',
  label: '系统管理',
  icon: <SettingOutlined />,
  element: <Navigate to="/system/user-info" />,
  rules: [rules.SYSTEM, rules.SYSTEM_USERINFO, rules.SYSTEM_SETTING],
  children: [
    {
      path: '/system/user-info',
      name: 'UserInfo',
      label: '个人信息',
      element: <UserInfo></UserInfo>,
      rules: [rules.SYSTEM_USERINFO],
    },
    {
      path: '/system/system-setting',
      name: 'SystemSetting',
      label: '系统设置',
      element: <SystemSetting></SystemSetting>,
      rules: [rules.SYSTEM_SETTING],
    },
  ]
}

export default routes