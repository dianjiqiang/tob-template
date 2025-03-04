import React, { memo, type ForwardRefExoticComponent } from "react"
import Icon from "@ant-design/icons"
import type { GetProps } from "antd"

type IconComponentProps = GetProps<typeof Icon>

const FasteningSvg: ForwardRefExoticComponent<any> = memo(() => {
  return (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path
        d="M523.84728 791.696c3.1 0 6.1-0.2 9.2-0.7 21.7-3.3 39.5-18.8 45.9-39.7l47.4-152.3c1.2-3.9 4.2-6.9 8.1-8.1l152.3-47.4c30.3-9.5 47.2-41.7 37.8-72-3.8-12-11.4-22.5-21.7-29.8l-130.3-92.1c-3.3-2.3-5.3-6.2-5.2-10.3l2.1-159.5c0.4-31.8-25-57.8-56.8-58.2-12.6-0.2-25 3.8-35.1 11.4l-127.9 95.4c-3.2 2.4-7.5 3.1-11.3 1.8l-151-51.2c-30.1-10.2-62.7 5.9-72.9 36-4.1 12-4.1 25 0 37l51.2 151c1.3 3.8 0.6 8.1-1.8 11.3l-95.2 127.8c-19 25.5-13.7 61.5 11.7 80.5 9.9 7.4 21.9 11.4 34.3 11.4h0.8l159.5-2.1c4.1 0 7.9 1.9 10.3 5.2l92.1 130.3c10.5 15.1 27.9 24.2 46.5 24.3z m221.3-307.1l-131.1 40.8a80.88 80.88 0 0 0-53.2 53.2l-40.7 131.1-79.3-112.3c-15.3-21.7-40.4-34.5-67-34.2l-137.3 1.8 82.1-110.1c15.9-21.3 20.3-49.1 11.8-74.3l-44-130 130.1 43.9c25.2 8.5 53 4.1 74.3-11.8l110.1-82.1-1.8 137.3c-0.3 26.6 12.4 51.6 34.2 67l111.8 79.7z m-466-254.8z"
        p-id="7447"
      ></path>
      <path
        d="M943.24728 988.396c21.4 0 42-8.5 57.1-23.6 31.5-31.6 31.5-82.7 0-114.2l-232.2-232.3c-30.9-32.2-82-33.3-114.2-2.4s-33.3 82-2.4 114.2l2.4 2.4 232.2 232.3c15.1 15.1 35.7 23.7 57.1 23.6z m8.8-72c-4.9 4.7-12.6 4.7-17.4 0l-232.3-232.3c-4.7-4.9-4.7-12.6 0-17.4 4.8-4.7 12.6-4.7 17.4 0l232.2 232.2c4.7 4.9 4.6 12.7-0.2 17.5h0.3zM8.54728 254.196c-0.8-5.3 2.8-10.3 8.1-11.2 0.9-0.1 1.8-0.2 2.7 0l32.6 3.9c1.8 0.2 3.6-0.1 5.2-0.8l29.8-13.5c4.9-2.3 10.7-0.2 13 4.6 0.3 0.6 0.5 1.2 0.6 1.8l8.4 33.5c0.4 1.7 1.3 3.2 2.5 4.4l23.6 24.8c3.7 3.9 3.5 10.1-0.4 13.8-0.6 0.5-1.2 1-1.8 1.4l-27.6 15.9c-1.6 0.9-2.9 2.3-3.8 3.9l-14.9 28.2c-2.5 4.8-8.4 6.6-13.2 4-0.7-0.4-1.3-0.8-1.9-1.3l-25.6-22.7c-1.3-1.2-2.8-2-4.5-2.3l-33.7-7.3c-5.3-1.2-8.6-6.4-7.4-11.6 0.1-0.6 0.3-1.2 0.6-1.8l12.1-29.9c0.7-1.7 0.9-3.5 0.6-5.2l-5-32.6zM377.74728 53.596c-0.4-2.7 1.4-5.2 4-5.6 0.5-0.1 0.9-0.1 1.4 0l40.2 4.9c1 0.2 2 0 2.9-0.4l36.4-16.6c2.5-1.1 5.3 0 6.5 2.4 0.1 0.3 0.2 0.6 0.3 0.8l10 40.3c0.2 0.8 0.6 1.6 1.2 2.2l28.8 30.3c1.9 1.9 1.8 5-0.2 6.9-0.3 0.3-0.6 0.5-1 0.7l-34.2 19.7c-0.8 0.5-1.5 1.1-1.9 2l-18.3 34.7c-1.3 2.4-4.2 3.3-6.6 2.1-0.4-0.2-0.7-0.4-1-0.7l-31.5-27.6c-0.6-0.6-1.4-1-2.2-1.1l-40.6-8.6c-2.6-0.5-4.3-3.1-3.8-5.8l0.3-0.9 15.3-36.9c0.3-0.8 0.5-1.7 0.3-2.6l-6.3-40.2z"
        p-id="7448"
      ></path>
    </svg>
  )
})

const Fastening: React.FC<IconComponentProps> = memo((props) => {
  return <Icon component={FasteningSvg} {...props}></Icon>
})

Fastening.displayName = "Fastening"

export default Fastening
