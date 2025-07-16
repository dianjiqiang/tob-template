import React, { memo, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import type { ReactNode } from "react"
import { LangChangeStyled } from "./style"
import { Popover } from "antd"
import classnames from "classnames"
import { useThemeStore } from "store/theme"
import { useShallow } from "zustand/shallow"

import DarkLang from "@/assets/dark-lang.svg"
import LightLang from "@/assets/light-lang.svg"

interface LangChangeType {
  children?: ReactNode
}

const options = [
  { label: "简体中文", value: "zh" },
  { label: "English", value: "en" },
  { label: "日本語", value: "jp" },
]

const LangChange: React.FC<LangChangeType> = memo(() => {
  const [lang, setLang] = useState(localStorage.getItem("lang") ? localStorage.getItem("lang") : "zh")
  const [open, setOpen] = useState(false)
  const { i18n } = useTranslation()
  const theme = useThemeStore(useShallow((state) => state.theme))

  useEffect(() => {
    if (lang) {
      setLang(lang)
      i18n.changeLanguage(lang)
      setOpen(false)
    }
  }, [i18n, lang])

  const handleChangeLang = (value: string) => {
    setLang(value)
    localStorage.setItem("lang", value)
    i18n.changeLanguage(value)
    window.location.reload()
    setOpen(false)
  }

  return (
    <LangChangeStyled>
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
          {theme === "dark" ? (
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
