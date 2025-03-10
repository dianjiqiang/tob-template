import React, { memo, type ForwardRefExoticComponent } from "react"
import Icon from "@ant-design/icons"
import type { GetProps } from "antd"

type IconComponentProps = GetProps<typeof Icon>

const ShrinkSvg: ForwardRefExoticComponent<any> = memo(() => {
  return (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path
        d="M605.824 513.536l335.68 338.304c24.704 24.96 24.704 65.28 0 90.176-24.704 24.896-64.768 24.896-89.472 0L471.616 558.656l0 0c0 0 0 0 0 0-18.496-18.688-23.168-46.08-13.888-69.056 3.072-7.68 7.744-14.912 13.952-21.12l380.352-383.424c24.704-24.96 64.768-24.96 89.472 0 24.704 24.96 24.704 65.28 0 90.24L605.824 513.536zM219.072 511.296l340.736 338.944c25.088 24.96 25.088 65.408 0 90.368-12.544 12.48-28.992 18.752-45.44 18.752-16.448 0-32.896-6.208-45.44-18.752L82.88 556.48l0 0c0 0 0 0 0 0C64 537.728 59.264 510.336 68.736 487.232c3.136-7.68 7.872-14.912 14.144-21.12l386.112-384.128c12.544-12.48 28.992-18.752 45.44-18.752 16.448 0 32.896 6.208 45.376 18.688 25.088 25.024 25.088 65.408 0 90.368L219.072 511.296z"
        p-id="3329"
      ></path>
    </svg>
  )
})

const Shrink: React.FC<IconComponentProps> = memo((props) => {
  return <Icon component={ShrinkSvg} {...props}></Icon>
})

Shrink.displayName = "Shrink"

export default Shrink
