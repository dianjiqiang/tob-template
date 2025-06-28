# 项目 i18n 国际化优化总结

## 优化概述

本次优化全面检查了项目中所有硬编码的中文文本，并将它们全部替换为 i18n 国际化方案，支持中文、英文、日文三种语言。

## 新增翻译文件

### 1. 路由相关翻译 (`route.ts`)
- **中文**: `src/i18n/lang/zh/translation/route.ts`
- **英文**: `src/i18n/lang/en/translation/route.ts`
- **日文**: `src/i18n/lang/jp/translation/route.ts`

包含内容：
- 关于、登录、概览、分析页、工作台
- 错误页面标签
- 刷新页面提示

### 2. 错误消息翻译 (`error.ts`)
- **中文**: `src/i18n/lang/zh/translation/error.ts`
- **英文**: `src/i18n/lang/en/translation/error.ts`
- **日文**: `src/i18n/lang/jp/translation/error.ts`

包含内容：
- 服务器错误、权限不足、未登录等错误消息
- 确认、取消按钮文本
- 表单验证失败等提示

### 3. 语言选择翻译 (`language.ts`)
- **中文**: `src/i18n/lang/zh/translation/language.ts`
- **英文**: `src/i18n/lang/en/translation/language.ts`
- **日文**: `src/i18n/lang/jp/translation/language.ts`

包含内容：
- 简体中文、English、日本語

## 修改的文件

### 1. 路由文件
- `src/router/index.tsx` - 将静态路由改为 hook 函数，支持 i18n
- `src/router/modules/statistics.tsx` - 将静态路由改为 hook 函数，支持 i18n
- `src/router/getRoutes.tsx` - 适配新的路由结构

### 2. 组件文件
- `src/components/Header/c-cpns/header-left/HeaderLeft.tsx` - 添加 i18n 支持
- `src/components/langChange/index.tsx` - 语言选择使用 i18n

### 3. 工具文件
- `src/utils/servers/statusOperation.tsx` - 错误处理使用 i18n
- `src/views/base-view/login/cpns/LoginForm/index.tsx` - 登录表单错误消息使用 i18n

### 4. 主应用文件
- `src/App.tsx` - 适配新的路由结构，错误消息使用 i18n

## 技术实现

### 1. Hook 化路由
将静态路由配置改为 hook 函数，确保 i18n 在路由定义时可用：

```typescript
// 之前
export const initialRoutes = [
  { label: "关于", ... }
]

// 现在
export const useInitialRoutes = () => {
  const { t } = useTranslation()
  return [
    { label: t("route.about"), ... }
  ]
}
```

### 2. 工具函数 i18n 支持
对于不能使用 hook 的工具函数，使用 i18next 实例：

```typescript
import i18next from "i18next"

messageApi.error(i18next.t("error.serverErrorDesc"))
```

### 3. 组件级 i18n
在 React 组件中使用 useTranslation hook：

```typescript
const { t } = useTranslation()
title={t("route.refreshPage")}
```

## 语言支持

### 中文 (zh)
- 默认语言
- 完整的用户界面翻译

### 英文 (en)
- 专业的英文翻译
- 符合英文用户习惯

### 日文 (jp)
- 准确的日文翻译
- 符合日文用户习惯

## 使用方式

### 1. 切换语言
用户可以通过语言选择器切换语言，支持：
- 简体中文
- English
- 日本語

### 2. 添加新翻译
在对应的翻译文件中添加新的键值对：

```typescript
// src/i18n/lang/zh/translation/your-file.ts
export default {
  newKey: "新文本"
}

// src/i18n/lang/en/translation/your-file.ts
export default {
  newKey: "New Text"
}

// src/i18n/lang/jp/translation/your-file.ts
export default {
  newKey: "新しいテキスト"
}
```

### 3. 在组件中使用
```typescript
import { useTranslation } from "react-i18next"

const { t } = useTranslation()
return <div>{t("your-file.newKey")}</div>
```

## 优化效果

1. **国际化支持**: 完整支持多语言切换
2. **用户体验**: 用户可以使用熟悉的语言
3. **代码质量**: 消除了硬编码文本，提高可维护性
4. **扩展性**: 易于添加新的语言支持
5. **一致性**: 统一的翻译管理方式

## 注意事项

1. 路由结构已改为 hook 函数，需要在使用时调用
2. 错误处理函数使用 i18next 实例而非 hook
3. 新增文本时需要在三种语言文件中都添加翻译
4. 翻译键名建议使用有意义的命名空间

## 后续建议

1. 考虑添加翻译缺失检测
2. 可以添加翻译管理工具
3. 考虑添加语言偏好记忆功能
4. 可以添加翻译贡献指南 
