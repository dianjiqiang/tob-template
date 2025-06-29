import { KeyieUseMessageType } from "./type"
import { statusCode } from "@/const/modules/statusCode"
import { message as messageApi, Modal, notification } from "antd"
import { CloseCircleOutlined } from "@ant-design/icons"
import i18next from "i18next"

const { confirm } = Modal

export const statusOperation = (status: number, useMessage: KeyieUseMessageType, message: string) => {
  // 尽可能少判断
  if (useMessage === "none") {
    return
  }
  if (useMessage === "message") {
    switch (status) {
      case statusCode.ERROR:
        messageApi.error(message ?? i18next.t("error.serverErrorDesc"))
        break
      case statusCode.FORBIDDEN:
        messageApi.error(message ?? i18next.t("error.permissionDeniedDesc"))
        break
      case statusCode.UNAUTHORIZED:
        messageApi.error(message ?? i18next.t("error.notLoggedInDesc"))
        break
      case statusCode.NOT_FOUND:
        messageApi.error(message ?? i18next.t("error.requestUrlErrorDesc"))
        break
      case statusCode.METHOD_NOT_ALLOWED:
        messageApi.error(message ?? i18next.t("error.requestMethodErrorDesc"))
        break
      case statusCode.BAD_GATEWAY:
        messageApi.error(message ?? i18next.t("error.gatewayErrorDesc"))
        break
      case statusCode.NOT_IMPLEMENTED:
        messageApi.error(message ?? i18next.t("error.serviceNotImplementedDesc"))
        break
      case statusCode.REQUEST_TIMEOUT:
        messageApi.error(message ?? i18next.t("error.requestTimeoutDesc"))
        break
      default:
        messageApi.error(message ?? i18next.t("error.systemExceptionDesc"))
        break
    }
  }
  if (useMessage === "confirm") {
    switch (status) {
      case statusCode.ERROR:
        confirm({
          title: i18next.t("error.serverError"),
          content: message ?? i18next.t("error.serverErrorDesc"),
          okText: i18next.t("error.confirm"),
          cancelText: i18next.t("error.cancel"),
        })
        break
      case statusCode.FORBIDDEN:
        confirm({
          title: i18next.t("error.permissionDenied"),
          content: message ?? i18next.t("error.permissionDeniedDesc"),
          okText: i18next.t("error.confirm"),
          cancelText: i18next.t("error.cancel"),
        })
        break
      case statusCode.UNAUTHORIZED:
        confirm({
          title: i18next.t("error.notLoggedIn"),
          content: message ?? i18next.t("error.notLoggedInDesc"),
          okText: i18next.t("error.confirm"),
          cancelText: i18next.t("error.cancel"),
        })
        break
      case statusCode.NOT_FOUND:
        confirm({
          title: i18next.t("error.requestUrlError"),
          content: message ?? i18next.t("error.requestUrlErrorDesc"),
          okText: i18next.t("error.confirm"),
          cancelText: i18next.t("error.cancel"),
        })
        break
      case statusCode.METHOD_NOT_ALLOWED:
        confirm({
          title: i18next.t("error.requestMethodError"),
          content: message ?? i18next.t("error.requestMethodErrorDesc"),
          okText: i18next.t("error.confirm"),
          cancelText: i18next.t("error.cancel"),
        })
        break
      case statusCode.BAD_GATEWAY:
        confirm({
          title: i18next.t("error.gatewayError"),
          content: message ?? i18next.t("error.gatewayErrorDesc"),
          okText: i18next.t("error.confirm"),
          cancelText: i18next.t("error.cancel"),
        })
        break
      case statusCode.NOT_IMPLEMENTED:
        confirm({
          title: i18next.t("error.serviceNotImplemented"),
          content: message ?? i18next.t("error.serviceNotImplementedDesc"),
          okText: i18next.t("error.confirm"),
          cancelText: i18next.t("error.cancel"),
        })
        break
      case statusCode.REQUEST_TIMEOUT:
        confirm({
          title: i18next.t("error.requestTimeout"),
          content: message ?? i18next.t("error.requestTimeoutDesc"),
          okText: i18next.t("error.confirm"),
          cancelText: i18next.t("error.cancel"),
        })
        break
      default:
        confirm({
          title: i18next.t("error.systemException"),
          content: message ?? i18next.t("error.systemExceptionDesc"),
          okText: i18next.t("error.confirm"),
          cancelText: i18next.t("error.cancel"),
        })
        break
    }
  }
  if (useMessage === "notification") {
    switch (status) {
      case statusCode.ERROR:
        notification.open({
          message: i18next.t("error.serverError"),
          description: message ?? i18next.t("error.serverErrorDesc"),
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: "var(--danger-color)" }} />,
        })
        break
      case statusCode.FORBIDDEN:
        notification.open({
          message: i18next.t("error.permissionDenied"),
          description: message ?? i18next.t("error.permissionDeniedDesc"),
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: "var(--danger-color)" }} />,
        })
        break
      case statusCode.UNAUTHORIZED:
        notification.open({
          message: i18next.t("error.notLoggedIn"),
          description: message ?? i18next.t("error.notLoggedInDesc"),
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: "var(--danger-color)" }} />,
        })
        break
      case statusCode.NOT_FOUND:
        notification.open({
          message: i18next.t("error.requestUrlError"),
          description: message ?? i18next.t("error.requestUrlErrorDesc"),
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: "var(--danger-color)" }} />,
        })
        break
      case statusCode.METHOD_NOT_ALLOWED:
        notification.open({
          message: i18next.t("error.requestMethodError"),
          description: message ?? i18next.t("error.requestMethodErrorDesc"),
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: "var(--danger-color)" }} />,
        })
        break
      case statusCode.BAD_GATEWAY:
        notification.open({
          message: i18next.t("error.gatewayError"),
          description: message ?? i18next.t("error.gatewayErrorDesc"),
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: "var(--danger-color)" }} />,
        })
        break
      case statusCode.NOT_IMPLEMENTED:
        notification.open({
          message: i18next.t("error.serviceNotImplemented"),
          description: message ?? i18next.t("error.serviceNotImplementedDesc"),
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: "var(--danger-color)" }} />,
        })
        break
      case statusCode.REQUEST_TIMEOUT:
        notification.open({
          message: i18next.t("error.requestTimeout"),
          description: message ?? i18next.t("error.requestTimeoutDesc"),
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: "var(--danger-color)" }} />,
        })
        break
      default:
        notification.open({
          message: i18next.t("error.systemException"),
          description: message ?? i18next.t("error.systemExceptionDesc"),
          duration: 0,
          closeIcon: <CloseCircleOutlined style={{ color: "var(--danger-color)" }} />,
        })
        break
    }
  }
}
