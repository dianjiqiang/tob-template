import { KeyieUseMessageType } from "./type"
import { statusCode } from "@/const/modules/statusCode"
import { message as messageApi, Modal, notification } from "antd"
import { CloseCircleOutlined } from "@ant-design/icons"
import { basicThemeData } from "@/context/ThemeContext"

const { confirm } = Modal

export const statusOperation = (status: number, useMessage: KeyieUseMessageType, message: string) => {
  // 尽可能少判断
  if (useMessage === "none") {
    return
  }
  if (useMessage === "message") {
    switch (status) {
      case statusCode.ERROR:
        messageApi.error(message ?? "服务器错误, 请稍后重试")
        break
      case statusCode.FORBIDDEN:
        messageApi.error(message ?? "权限不足, 请联系管理员")
        break
      case statusCode.UNAUTHORIZED:
        messageApi.error(message ?? "未登录, 请重新登录")
        break
      case statusCode.NOT_FOUND:
        messageApi.error(message ?? "请求地址错误, 请检查地址是否正确")
        break
      case statusCode.METHOD_NOT_ALLOWED:
        messageApi.error(message ?? "请求方法错误, 请检查请求方法是否正确")
        break
      case statusCode.BAD_GATEWAY:
        messageApi.error(message ?? "网关错误, 请稍后重试")
        break
      case statusCode.NOT_IMPLEMENTED:
        messageApi.error(message ?? "服务未实现, 请稍后重试")
        break
      case statusCode.REQUEST_TIMEOUT:
        messageApi.error(message ?? "请求超时, 请稍后重试")
        break
      default:
        messageApi.error(message ?? "系统异常, 请稍后重试")
        break
    }
  }
  if (useMessage === "confirm") {
    switch (status) {
      case statusCode.ERROR:
        confirm({
          title: "服务器错误",
          content: message ?? "服务器错误, 请稍后重试",
          okText: "确定",
          cancelText: "取消",
        })
        break
      case statusCode.FORBIDDEN:
        confirm({
          title: "权限不足",
          content: message ?? "权限不足, 请联系管理员",
          okText: "确定",
          cancelText: "取消",
        })
        break
      case statusCode.UNAUTHORIZED:
        confirm({
          title: "未登录",
          content: message ?? "未登录, 请重新登录",
          okText: "确定",
          cancelText: "取消",
        })
        break
      case statusCode.NOT_FOUND:
        confirm({
          title: "请求地址错误",
          content: message ?? "请求地址错误, 请检查地址是否正确",
          okText: "确定",
          cancelText: "取消",
        })
        break
      case statusCode.METHOD_NOT_ALLOWED:
        confirm({
          title: "请求方法错误",
          content: message ?? "请求方法错误, 请检查请求方法是否正确",
          okText: "确定",
          cancelText: "取消",
        })
        break
      case statusCode.BAD_GATEWAY:
        confirm({
          title: "网关错误",
          content: message ?? "网关错误, 请稍后重试",
          okText: "确定",
          cancelText: "取消",
        })
        break
      case statusCode.NOT_IMPLEMENTED:
        confirm({
          title: "服务未实现",
          content: message ?? "服务未实现, 请稍后重试",
          okText: "确定",
          cancelText: "取消",
        })
        break
      case statusCode.REQUEST_TIMEOUT:
        confirm({
          title: "请求超时",
          content: message ?? "请求超时, 请稍后重试",
          okText: "确定",
          cancelText: "取消",
        })
        break
      default:
        confirm({
          title: "系统异常",
          content: message ?? "系统异常, 请稍后重试",
          okText: "确定",
          cancelText: "取消",
        })
        break
    }
  }
  if (useMessage === "notification") {
    switch (status) {
      case statusCode.ERROR:
        notification.open({
          message: "服务器错误",
          description: message ?? "服务器错误, 请稍后重试",
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: basicThemeData["danger-color"] }} />,
        })
        break
      case statusCode.FORBIDDEN:
        notification.open({
          message: "权限不足",
          description: message ?? "权限不足, 请联系管理员",
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: basicThemeData["danger-color"] }} />,
        })
        break
      case statusCode.UNAUTHORIZED:
        notification.open({
          message: "未登录",
          description: message ?? "未登录, 请重新登录",
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: basicThemeData["danger-color"] }} />,
        })
        break
      case statusCode.NOT_FOUND:
        notification.open({
          message: "请求地址错误",
          description: message ?? "请求地址错误, 请检查地址是否正确",
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: basicThemeData["danger-color"] }} />,
        })
        break
      case statusCode.METHOD_NOT_ALLOWED:
        notification.open({
          message: "请求方法错误",
          description: message ?? "请求方法错误, 请检查请求方法是否正确",
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: basicThemeData["danger-color"] }} />,
        })
        break
      case statusCode.BAD_GATEWAY:
        notification.open({
          message: "网关错误",
          description: message ?? "网关错误, 请稍后重试",
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: basicThemeData["danger-color"] }} />,
        })
        break
      case statusCode.NOT_IMPLEMENTED:
        notification.open({
          message: "服务未实现",
          description: message ?? "服务未实现, 请稍后重试",
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: basicThemeData["danger-color"] }} />,
        })
        break
      case statusCode.REQUEST_TIMEOUT:
        notification.open({
          message: "请求超时",
          description: message ?? "请求超时, 请稍后重试",
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: basicThemeData["danger-color"] }} />,
        })
        break
      default:
        notification.open({
          message: "系统异常",
          description: message ?? "系统异常, 请稍后重试",
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: basicThemeData["danger-color"] }} />,
        })
        break
    }
  }
}
