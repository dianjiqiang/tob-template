import React, { useState, useEffect, useCallback } from "react"
import { ProTable, ProColumns } from "@ant-design/pro-components"
import { Card, Tag, message } from "antd"
import { useTranslation } from "react-i18next"
import { LoginHistoryWrapper } from "./style.tsx"

interface LoginRecord {
  id: string
  loginTime: string
  logoutTime?: string
  ipAddress: string
  location: string
  device: string
  browser: string
  os: string
  status: "success" | "failed"
  reason?: string
}

// 模拟数据
const mockData: LoginRecord[] = [
  {
    id: "1",
    loginTime: "2024-01-15 10:30:00",
    logoutTime: "2024-01-15 18:00:00",
    ipAddress: "192.168.1.100",
    location: "北京市",
    device: "Desktop",
    browser: "Chrome 120.0",
    os: "Windows 11",
    status: "success",
  },
  {
    id: "2",
    loginTime: "2024-01-14 09:15:00",
    logoutTime: "2024-01-14 17:45:00",
    ipAddress: "192.168.1.101",
    location: "上海市",
    device: "Mobile",
    browser: "Safari 17.0",
    os: "iOS 17.0",
    status: "success",
  },
  {
    id: "3",
    loginTime: "2024-01-13 14:20:00",
    ipAddress: "192.168.1.102",
    location: "广州市",
    device: "Desktop",
    browser: "Firefox 121.0",
    os: "macOS 14.0",
    status: "failed",
    reason: "密码错误",
  },
  {
    id: "4",
    loginTime: "2024-01-12 08:45:00",
    logoutTime: "2024-01-12 16:30:00",
    ipAddress: "192.168.1.103",
    location: "深圳市",
    device: "Desktop",
    browser: "Edge 120.0",
    os: "Windows 10",
    status: "success",
  },
  {
    id: "5",
    loginTime: "2024-01-11 11:00:00",
    ipAddress: "192.168.1.104",
    location: "杭州市",
    device: "Tablet",
    browser: "Chrome 119.0",
    os: "Android 14.0",
    status: "failed",
    reason: "账号被锁定",
  },
]

const LoginHistory: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<LoginRecord[]>([])
  const { t } = useTranslation()

  const fetchLoginHistory = useCallback(async () => {
    setLoading(true)
    try {
      // 这里调用获取登录历史的API
      // const response = await getLoginHistory()
      // setDataSource(response.data)

      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setDataSource(mockData)
    } catch {
      message.error(t("view.userInfo.fetchHistoryFailed"))
    } finally {
      setLoading(false)
    }
  }, [t, setDataSource, setLoading])

  useEffect(() => {
    fetchLoginHistory()
  }, [fetchLoginHistory])

  const columns: ProColumns<LoginRecord>[] = [
    {
      title: t("view.userInfo.loginTime"),
      dataIndex: "loginTime",
      key: "loginTime",
      width: 180,
      sorter: true,
    },
    {
      title: t("view.userInfo.logoutTime"),
      dataIndex: "logoutTime",
      key: "logoutTime",
      width: 180,
      render: (_, record) => record.logoutTime || "-",
    },
    {
      title: t("view.userInfo.ipAddress"),
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: 140,
    },
    {
      title: t("view.userInfo.location"),
      dataIndex: "location",
      key: "location",
      width: 120,
    },
    {
      title: t("view.userInfo.device"),
      dataIndex: "device",
      key: "device",
      width: 100,
    },
    {
      title: t("view.userInfo.browser"),
      dataIndex: "browser",
      key: "browser",
      width: 150,
    },
    {
      title: t("view.userInfo.operatingSystem"),
      dataIndex: "os",
      key: "os",
      width: 150,
    },
    {
      title: t("view.userInfo.status"),
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (_, record) => (
        <Tag color={record.status === "success" ? "green" : "red"}>
          {record.status === "success" ? t("view.userInfo.success") : t("view.userInfo.failed")}
        </Tag>
      ),
    },
    {
      title: t("view.userInfo.reason"),
      dataIndex: "reason",
      key: "reason",
      width: 150,
      render: (_, record) => record.reason || "-",
    },
  ]

  return (
    <LoginHistoryWrapper>
      <Card title={t("view.userInfo.loginHistoryTitle")}>
        <ProTable<LoginRecord>
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey="id"
          search={false}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${t("view.userInfo.showing")} ${range[0]}-${range[1]} ${t("view.userInfo.of")} ${total} ${t(
                "view.userInfo.records"
              )}`,
          }}
          options={{
            reload: () => fetchLoginHistory(),
            setting: true,
            density: true,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </LoginHistoryWrapper>
  )
}

export default LoginHistory
