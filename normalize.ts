import { EventData } from '../interfaces/EventData.interface'
import { Handler } from '../index'
import Queue from 'better-queue'

export enum MouseType {
  MOVE = 1,
  CLICK = 2,
  DOWN = 3,
  UP = 4
}

const normalize = (value: number, min: number, max: number) => {
  return 2 * ((value - min) / (max - min)) - 1
}

const shiftNumber = (value: number, mid: number) => {
  if (value >= mid) {
    return value - mid
  } else {
    return -mid + value
  }
}

function handler(ev: MouseEvent, type: MouseType, handler: Handler) {
  const halfX = Math.ceil(window.innerWidth / 2)
  const halfY = Math.ceil(window.innerHeight / 2)

  const rawX = shiftNumber(ev.pageX, halfX)
  const rawY = shiftNumber(ev.pageY, halfY)

  const normX = normalize(rawX, -halfX, halfX)
  const normY = normalize(rawY, -halfY, halfY)

  handler.queue.push(
    {
      event: 'mouse',
      type,
      delay: handler.delay(Date.now()),
      location: {
        xCoord: normX,
        yCoord: normY
      }
    },
    () => {}
  )
}

export default handler
