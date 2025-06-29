const optimizeEventListeners = () => {
  try {
    const originalAddEventListener = EventTarget.prototype.addEventListener
    EventTarget.prototype.addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      const passiveEvents = ["touchstart", "touchmove", "wheel", "mousewheel"]

      if (passiveEvents.includes(type)) {
        if (typeof options === "object" && options !== null) {
          if (options.passive === undefined) {
            options.passive = true
          }
        } else if (options === undefined) {
          options = { passive: true }
        }
      }
      return originalAddEventListener.call(this, type, listener, options)
    }
  } catch (error) {
    console.warn("事件监听器优化失败:", error)
  }
}

optimizeEventListeners()
