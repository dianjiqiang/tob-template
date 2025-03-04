import React, { memo, type ForwardRefExoticComponent } from "react"
import Icon from "@ant-design/icons"
import type { GetProps } from "antd"

type IconComponentProps = GetProps<typeof Icon>

const UnfoldSvg: ForwardRefExoticComponent<any> = memo(() => {
  return (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path
        d="M450.91845 508.946741l-413.058224-413.058225a56.647985 56.647985 0 0 1 80.082717-80.082717l455.207023 455.207023a58.628979 58.628979 0 0 1 0 80.082717l-455.207023 455.207024a56.647985 56.647985 0 1 1-80.082717-80.082718z"
        p-id="2411"
      ></path>
      <path
        d="M863.976675 508.946741l-413.058225-413.058225a56.647985 56.647985 0 0 1 80.082717-80.082717l455.207023 455.207023a58.628979 58.628979 0 0 1 0 80.082717l-459.421902 455.207024a56.647985 56.647985 0 0 1-80.082717-80.082718z"
        p-id="2412"
      ></path>
    </svg>
  )
})

const Unfold: React.FC<IconComponentProps> = memo((props) => {
  return <Icon component={UnfoldSvg} {...props}></Icon>
})

Unfold.displayName = "Unfold"

export default Unfold
