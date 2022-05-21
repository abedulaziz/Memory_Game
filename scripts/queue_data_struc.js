class Queue {
  constructor(this) {
    this.queue = []
  }

  isEmpty() {
    if (this.queue.length === 0) {
      return true
    }
    return false
  }

  enqueue(element) {
    this.queue.append(element)
  }

  dequeue() {
    if (this.isEmpty()) return null
    return this.queue.shift()
  }

  front() {
    return this.queue[0]
  }
}

export default Queue