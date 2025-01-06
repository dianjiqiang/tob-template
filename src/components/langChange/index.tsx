import React, { memo, useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import type { ReactNode } from "react"
import { LangChangeStyled } from "./style"
import { Popover } from "antd"
import classnames from "classnames"
import { ThemeContext } from "@/context/ThemeContext"

import DarkLang from "@/assets/dark-lang.svg"
import LightLang from "@/assets/light-lang.svg"

interface LangChangeType {
  children?: ReactNode
}

const options = [
  { label: "简体中文", value: "ch" },
  { label: "english", value: "en" },
  { label: "日本語", value: "jp" },
]

const LangChange: React.FC<LangChangeType> = memo(() => {
  const [lang, setLang] = useState(localStorage.getItem("lang") ? localStorage.getItem("lang") : "ch")
  const [open, setOpen] = useState(false)
  const { i18n } = useTranslation()
  const theme = useContext(ThemeContext)
  const handleChangeLang = (value: string) => {
    setLang(value)
    i18n.changeLanguage(value)
    setOpen(false)
  }
  return (
    <LangChangeStyled {...theme} setThemeState={undefined}>
      <div className="popover-wrapper">
        <Popover
          content={options.map((item) => (
            <p
              className={classnames({ "popover-item-active": item.value === lang, "popover-item": true })}
              key={item.value}
              onClick={() => handleChangeLang(item.value)}
            >
              {item.label}
            </p>
          ))}
          getPopupContainer={() => document.querySelector(".popover-wrapper")!}
          trigger="click"
          open={open}
        >
          {theme.theme === "dark" ? (
            <img style={{ position: "relative", top: "3px" }} src={DarkLang} alt="" onClick={() => setOpen(!open)} />
          ) : (
            <img style={{ position: "relative", top: "3px" }} src={LightLang} alt="" onClick={() => setOpen(!open)} />
          )}
        </Popover>
      </div>
    </LangChangeStyled>
  )
})

LangChange.displayName = "LangChange"

export default LangChange
