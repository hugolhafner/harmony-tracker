import { MouseType } from '../handlers/MouseEvent'

export interface EventData {
  event: 'mouse'
  type: MouseType
  delay: number
  location?: {
    xCoord: number
    yCoord: number
  }
  target?: {
    tag: string
    class: string
    id: string
  }
}
