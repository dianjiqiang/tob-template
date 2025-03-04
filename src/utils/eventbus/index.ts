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
}

const eventBus = new EventBus()

export default eventBus
