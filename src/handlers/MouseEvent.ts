import { Handler } from '../index'

export enum MouseType {
  MOVE = 1,
  CLICK = 2,
  DOWN = 3,
  UP = 4
}

function handler(ev: MouseEvent, type: MouseType, handler: Handler) {
  handler.queue.push(
    {
      event: 'mouse',
      type,
      delay: handler.delay(Date.now()),
      location: {
        xCoord: ~~ev.pageX,
        yCoord: ~~ev.pageY
      }
    },
    () => {}
  )
}

export default handler
