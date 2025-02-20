import React, { memo, useEffect } from "react"
import type { ReactNode } from "react"
import { HeaderLeftStyled } from "./style"
import { useLocation } from "react-router-dom"

import { ReloadOutlined } from "@ant-design/icons"

interface HeaderLeftType {
  children?: ReactNode
}

const HeaderLeft: React.FC<HeaderLeftType> = memo(() => {
  const location = useLocation()
  const handleRefushClick = () => {
    window.location.reload()
  }

  useEffect(() => {
    console.log("localtion", location)
  }, [location])
  return (
    <HeaderLeftStyled>
      <ReloadOutlined className="hover-active" size={16} onClick={handleRefushClick} />
    </HeaderLeftStyled>
  )
})

HeaderLeft.displayName = "HeaderLeft"

export default HeaderLeft
