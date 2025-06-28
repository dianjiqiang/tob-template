# ECharts 主题系统

本项目为ECharts图表提供了简洁统一的自定义主题，完美契合项目的设计系统。

## 设计理念

### 🎯 简洁统一
- **一套颜色系统**: 不需要手动判断明暗色
- **自动主题适配**: 主题自动处理所有颜色和样式
- **用户友好**: 开发者只需要关注业务逻辑，不需要写两套配置

### 🌙 智能主题切换
- 自动检测当前主题（明/暗色）
- 自动应用相应的颜色和样式
- 无需手动传递 `isDark` 参数

## 使用方法

### 1. 基本使用

```tsx
import React from 'react'
import Echarts from '@/components/Echarts'
import type { EChartsOption } from 'echarts'

const MyChart: React.FC = () => {
  const options: EChartsOption = {
    series: [{
      type: 'line',
      data: [1, 2, 3, 4, 5]
      // 不需要手动指定颜色，主题会自动处理
    }]
  }

  return <Echarts options={options} />
}
```

### 2. 图表配置示例

```tsx
// 趋势图 - 简洁配置
export function getTrendOptions(data: any[]): EChartsOption {
  return {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: data.map(item => item.time)
    },
    yAxis: { type: "value" },
    series: [{
      type: "line",
      data: data.map(item => item.value),
      smooth: true,
      areaStyle: { opacity: 0.2 }
    }]
  }
}

// 饼图 - 简洁配置
export function getSourcePieOptions(data: any[]): EChartsOption {
  return {
    tooltip: { trigger: "item" },
    series: [{
      type: "pie",
      radius: ["40%", "70%"],
      data
    }]
  }
}
```

### 3. 使用主题颜色（可选）

```tsx
import { themeColors } from '@/assets/theme/echartsTheme'

// 如果需要自定义颜色，可以使用主题颜色
const options: EChartsOption = {
  series: [{
    type: 'line',
    itemStyle: {
      color: themeColors.primary
    }
  }]
}
```

## 配色方案

主题提供统一的配色方案：

```tsx
import { themeColors } from '@/assets/theme/echartsTheme'

// 主色调
themeColors.primary  // 主色
themeColors.success  // 成功色
themeColors.warning  // 警告色
themeColors.danger   // 危险色

// 扩展色
themeColors.purple   // 紫色
themeColors.cyan     // 青色
themeColors.pink     // 粉色
themeColors.yellow   // 黄色
```

## 主题特性

### 自动适配
- 背景色、文字颜色、边框颜色自动适配主题
- 坐标轴、图例、提示框样式自动调整
- 无需手动判断明暗色

### 统一规范
- 使用项目的CSS变量
- 保持设计系统的一致性
- 符合Tob SaaS产品的简洁规范

### 性能优化
- 主题切换时自动重新初始化
- 支持数据更新优化
- 响应式适配

## 最佳实践

1. **简洁配置**: 优先使用默认样式，让主题自动处理
2. **统一配色**: 如需自定义颜色，使用 `themeColors` 中的颜色
3. **避免硬编码**: 不要手动写 `isDark ? "#xxx" : "#yyy"` 这样的代码
4. **关注业务**: 专注于图表的数据和业务逻辑

## 示例对比

### ❌ 不推荐的做法
```tsx
// 手动判断明暗色，代码复杂
export function getOptions(data: any[], isDark: boolean) {
  return {
    tooltip: {
      backgroundColor: isDark ? "rgba(17, 24, 34, 0.95)" : "rgba(255, 255, 255, 0.95)",
      textStyle: { color: isDark ? "#ccc" : "#333" }
    },
    xAxis: {
      axisLine: { lineStyle: { color: isDark ? "#313131" : "#e8e8e8" } }
    }
  }
}
```

### ✅ 推荐的做法
```tsx
// 简洁配置，主题自动处理
export function getOptions(data: any[]) {
  return {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data },
    series: [{ type: "line", data }]
  }
}
```

## 文件结构

```
src/assets/theme/
├── index.ts              # 主题导出文件
├── echartsTheme.ts       # ECharts主题配置
└── README.md            # 本文档
```

## 相关文档

- [ECharts 组件文档](../components/Echarts/README.md)
- [主题系统配置](./echartsTheme.ts)
