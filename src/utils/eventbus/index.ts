type EventType = {
  [key: string]: ((...args: any) => any)[]
}

class EventBus {
  event: EventType = {}
  constructor() {
    this.event = {}
  }
  on(eventName: string, callback: (...args: any[]) => any) {
    if (this.event[eventName]) {
      this.event[eventName].push(callback)
    } else {
      this.event[eventName] = [callback]
    }
  }
  off(eventName: string, callback?: (...args: any[]) => any) {
    if (!this.event[eventName]) {
      return
    }

    if (!callback) {
      // 如果没有指定callback，则移除该事件的所有监听器
      delete this.event[eventName]
    } else {
      // 移除指定的callback
      const index = this.event[eventName].indexOf(callback)
      if (index > -1) {
        this.event[eventName].splice(index, 1)
      }
      // 如果没有监听器了，删除该事件
      if (this.event[eventName].length === 0) {
        delete this.event[eventName]
      }
    }
  }
  emit(eventName: string, ...args: any[]) {
    let result: any[] | null = this.event[eventName]?.length > 1 ? [] : null
    if (this.event[eventName]) {
      this.event[eventName].forEach((item) => {
        const res = item(...args)
        if ((res === undefined || res === null) && result) {
          result.push(res)
        }
      })
    }
    result = result?.length === 1 ? result[0] : result
    return result
  }
  // 清除所有事件监听器
  clear() {
    this.event = {}
  }
}

const eventBus = new EventBus()

export default eventBus
