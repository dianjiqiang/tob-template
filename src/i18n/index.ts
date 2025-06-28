import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { merge } from "lodash-es"

interface ModuleType {
  default: Record<string, any>
}
type i18nInitResourcesType = { [key: string]: any }

const modules = import.meta.glob<ModuleType>("./lang/**/*.ts")

const i18nInitResources: i18nInitResourcesType = {}

const createObjectToPath = (path: any[], data: i18nInitResourcesType) => {
  const newObject = {}

  path.reduce((acc, cur, index) => {
    if (index === path.length - 1) {
      acc[cur] = data
    } else {
      acc[cur] = {}
      return acc[cur]
    }
  }, newObject)

  return newObject
}

Object.keys(modules).forEach(async (file) => {
  const modulePath = file.split("/").map((item) => {
    let itemArr = item.split("-")
    if (itemArr.length !== 1) {
      itemArr = itemArr.map((word, index) => {
        if (index === 0) {
          return word.toLowerCase()
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
    }
    return itemArr.join("").replace(".ts", "")
  })

  if (!i18nInitResources[modulePath[2]]) {
    i18nInitResources[modulePath[2]] = {
      translation: {},
    }
  }
  const module = await modules[file]()
  const langData = createObjectToPath(modulePath.slice(3, modulePath.length), module.default)
  i18nInitResources[modulePath[2]] = merge(i18nInitResources[modulePath[2]], langData)
})

// 语言代码到 HTML lang 属性的映射
const langToHtmlLang: Record<string, string> = {
  zh: "zh-CN",
  en: "en",
  jp: "ja",
}

// 更新 HTML lang 属性的函数
const updateHtmlLang = (lang: string) => {
  const htmlElement = document.documentElement
  if (htmlElement) {
    htmlElement.lang = langToHtmlLang[lang] || lang
  }
}

i18n.use(initReactI18next).init({
  resources: i18nInitResources,
  lng: "zh",
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
})

// 初始化时设置 HTML lang 属性
const initialLang = localStorage.getItem("lang") || "zh"
updateHtmlLang(initialLang)

// 监听语言变化事件
i18n.on("languageChanged", (lng) => {
  updateHtmlLang(lng)
})

export default i18n
