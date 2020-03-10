import mouse, { MouseType } from './handlers/MouseEvent'

import { EventData } from './interfaces/EventData.interface'
import { TimestampType } from './interfaces/TimestampType.enum'
import axios from 'axios'
import browser from './handlers/BrowserProfile'
import fastq from 'fastq'
import uuid from 'uuid/v4'

export class Handler {
  /**
   * timestamps
   * * An array of current timestamps for the server to process as status
   * @type {[number, TimestampType][]}
   */
  private timestamps: [number, TimestampType][] = []

  /**
   * uid
   * * The stored uid for a user, gets set and retrieved via cookies
   * @type {string}
   */
  private uid: string = this.getUid

  /**
   * events
   * * The list of the current stored events that are waiting to be sent to the server
   * @type {EventData[]}
   */
  private events: EventData[] = []

  /**
   * firstEventTimestamp
   * * Resets is set the first event of every iteration when sending
   * @type {number}
   */
  private firstEventTimestamp: number

  /**
   * queue
   * * Local queue to process the incoming events gradually and send off data
   * @type {Queue}
   */
  public queue: fastq.queue

  /**
   * constructor()
   * * Takes parameters to see if the handler should track browser profiles and events
   * @param {boolean} shouldTrackBrowser boolean to indicate if the handler should track browser profiles
   * @param {boolean} shouldTrackEvents boolean to indicate if the handler should track events
   */
  constructor(
    private readonly shouldTrackBrowser: boolean,
    private readonly shouldTrackEvents: boolean
  ) {}

  /**
   * domain
   * * Strips the current DOM URL to be just the domain and returns it
   * @returns {string} the current web domain
   */
  private get domain(): string {
    return document.URL.split('://')[1].split('/')[0]
  }

  /**
   * getUid
   * * Either creates a new ht_uid cookie or reads its value '_hbck'
   * @private
   * @returns {string} the sessions uid
   */
  private get getUid(): string {
    const cookie: string = document.cookie
      .split('; ')
      .find(cookieStr => cookieStr.split('=')[0] === '_hbck')

    try {
      return cookie
        .split('=')
        .slice(1)
        .join('=')
        .split('||')[0]
    } catch (_) {
      return this.setUid()
    }
  }

  /**
   * setUid()
   * * Sets the '_hbck' cookie value to a new uid and returns it
   * @private
   * @returns {string} the new uid
   */
  private setUid(): string {
    const uid = uuid()
    document.cookie = `_hbck=${uid}||~0~==`
    return uid
  }

  /**
   * processEvent()
   * * The processing function used by the internal queue to sort events and batch send them to the server
   * @private
   * @param {EventData} event the event data to process and send off
   * @param {() => void} cb callback function to trigger when the event is processed
   * @type {fastq.worker<unknown>}
   */
  private processEvent: fastq.worker<unknown> = (event: EventData, cb: () => void) => {
    if (this.events.length < EVENT_LIMIT) {
      this.events.push(event)
    } else {
      const events = [...this.events]
      this.events = []

      this.send('event', events)
    }

    cb()
  }

  /**
   * delay()
   * * Calculates the delay from the first event in ms
   * @param {number} ts the current timestamp to calculate the delay from
   * @returns {number}
   */
  delay = (ts: number): number => {
    if (this.events.length) {
      return ts - this.firstEventTimestamp
    } else {
      this.timestamps.push([ts, TimestampType.EVENT])
      this.firstEventTimestamp = ts
      return 0
    }
  }

  /**
   * attachListeners()
   * * Attaches event listeners for all of the tracked DOM events
   * @private
   * @returns {void}
   */
  private attachListeners(): void {
    document.addEventListener('mousemove', (ev: MouseEvent) => mouse(ev, MouseType.MOVE, this))
    document.addEventListener('click', (ev: MouseEvent) => mouse(ev, MouseType.CLICK, this))
    document.addEventListener('mousedown', (ev: MouseEvent) => mouse(ev, MouseType.DOWN, this))
    document.addEventListener('mouseup', (ev: MouseEvent) => mouse(ev, MouseType.UP, this))
  }

  /**
   * send()
   * * Sends data to the collectors server-side to parse
   * @param {'event' | browser} from indicates wether send is triggered by browser profile or event
   * @param {EventData[] | any} data the data to send to the server as a result of the event
   * @returns {void}
   */
  send(from: 'event' | 'browser', data: EventData[] | any): void {
    const dataToSend: any = {
      uid: this.uid,
      from,
      data,
      _a: { origin: this.domain, ts: Date.now() }
    }

    if (from === 'event') {
      dataToSend.timestamps = [...this.timestamps]
      this.timestamps = [[Date.now(), TimestampType.START]]
    }

    axios.post('https://collector.your-domain.com/whatever/your/subdomain/is', {
      payload: btoa(JSON.stringify(dataToSend)),
      version: CURRENT_VERSION,
      url: document.URL
    })
  }

  /**
   * track()
   * * Begin tracking data via attaching event listeners and parsing the browser profile
   * @returns {void}
   */
  track(): void {
    this.queue = fastq(this.processEvent, 16)

    if (this.shouldTrackEvents) {
      this.timestamps.push([Date.now(), TimestampType.START])
      this.attachListeners()
      this.timestamps.push([Date.now(), TimestampType.LISTENERS])
    }

    if (this.shouldTrackBrowser) {
      browser(this)
    }
  }
}

const EVENT_LIMIT = 250
const CURRENT_VERSION = '1.0.5'

const main = () => {
  new Handler(true, true).track()
}

main()
