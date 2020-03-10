import { Handler } from '../index'

const getNP = async () => {
  /** @type {!Array} */
  var animationConfigs = []
  /** @type {!Array} */
  var t = [
    'geolocation',
    'notifications',
    'push',
    'midi',
    'camera',
    'microphone',
    'speaker',
    'device-info',
    'background-sync',
    'bluetooth',
    'persistent-storage',
    'ambient-light-sensor',
    'accelerometer',
    'gyroscope',
    'magnetometer',
    'clipboard',
    'accessibility-events',
    'clipboard-read',
    'clipboard-write',
    'payment-handler'
  ]
  try {
    if (!navigator['permissions']) {
      return 6
    }
    /**
     * @param {string} name
     * @param {?} event
     * @return {?}
     */
    var send = function(name, event) {
      return navigator['permissions']
        ['query']({
          name: name
        })
        ['then'](function(canCreateDiscussions) {
          switch (canCreateDiscussions['state']) {
            case 'prompt':
              /** @type {number} */
              animationConfigs[event] = 1
              break
            case 'granted':
              /** @type {number} */
              animationConfigs[event] = 2
              break
            case 'denied':
              /** @type {number} */
              animationConfigs[event] = 0
              break
            default:
              /** @type {number} */
              animationConfigs[event] = 5
          }
        })
        ['catch'](function(canCreateDiscussions) {
          /** @type {number} */
          animationConfigs[event] =
            -1 !==
            canCreateDiscussions['message']['indexOf'](
              'is not a valid enum value of type PermissionName'
            )
              ? 4
              : 3
        })
    }
    var promises = t['map'](function(pkg, prev) {
      return send(pkg, prev)
    })
    return await Promise['all'](promises)['then'](function() {
      return animationConfigs['join']('')
    })
  } catch (a) {
    return 7
  }
}

const getMR = () => {
  try {
    if (
      'undefined' == typeof performance ||
      void 0 === performance['now'] ||
      'undefined' == typeof JSON
    )
      return 'undef'
    for (
      var a = '',
        t = 1e3,
        e = [
          Math['abs'],
          Math['acos'],
          Math['asin'],
          Math['atanh'],
          Math['cbrt'],
          Math['exp'],
          Math['random'],
          Math['round'],
          Math['sqrt'],
          isFinite,
          isNaN,
          parseFloat,
          parseInt,
          JSON['parse']
        ],
        n = 0;
      n < e['length'];
      n++
    ) {
      var o = [],
        m = 0,
        r = performance['now'](),
        i = 0,
        c = 0
      if (void 0 !== e[n]) {
        for (i = 0; i < t && m < 0.6; i++) {
          // @ts-ignore
          for (var b = performance['now'](), d = 0; d < 4e3; d++) e[n](3.14)
          var k = performance['now']()
          o['push'](Math['round'](1e3 * (k - b))), (m = k - r)
        }
        var l = o['sort']()
        c = l[Math['floor'](l['length'] / 2)] / 5
      }
      a = a + c + ','
    }
    return a
  } catch (a) {
    return 'exception'
  }
}

const getFonts = () => {
  var a = []
  var e = ['serif', 'sans-serif', 'monospace'],
    n = [0, 0, 0],
    o = [0, 0, 0],
    m = document['createElement']('span')

  m['innerHTML'] = 'abcdefhijklmnopqrstuvxyz1234567890;+-.'
  m['style']['fontSize'] = '90px'

  var r
  for (r = 0; r < e['length']; r++) {
    m['style']['fontFamily'] = e[r]
    document['body']['appendChild'](m)
    n[r] = m['offsetWidth']
    o[r] = m['offsetHeight']
    document['body']['removeChild'](m)
  }

  for (
    var i = [
        'Geneva',
        'Lobster',
        'New York',
        'Century',
        'Apple Gothic',
        'Minion Pro',
        'Apple LiGothic',
        'Century Gothic',
        'Monaco',
        'Lato',
        'Fantasque Sans Mono',
        'Adobe Braille',
        'Cambria',
        'Futura',
        'Bell MT',
        'Courier',
        'Courier New',
        'Calibri',
        'Avenir Next',
        'Birch Std',
        'Palatino',
        'Ubuntu Regular',
        'Oswald',
        'Batang',
        'Ubuntu Medium',
        'Cantarell',
        'Droid Serif',
        'Roboto',
        'Helvetica Neue',
        'Corsiva Hebrew',
        'Adobe Hebrew',
        'TI-Nspire',
        'Comic Neue',
        'Noto',
        'AlNile',
        'Palatino-Bold',
        'ArialHebrew-Light',
        'Avenir',
        'Papyrus',
        'Open Sans',
        'Times',
        'Quicksand',
        'Source Sans Pro',
        'Damascus',
        'Microsoft Sans Serif'
      ],
      c = [],
      b = 0;
    b < i['length'];
    b++
  ) {
    var d = !1

    for (r = 0; r < e['length']; r++)
      if (
        ((m['style']['fontFamily'] = i[b] + ',' + e[r]),
        document['body']['appendChild'](m),
        (m['offsetWidth'] === n[r] && m['offsetHeight'] === o[r]) || (d = !0),
        document['body']['removeChild'](m),
        d)
      ) {
        c['push'](b)
        break
      }
  }
  a = c['sort']()
  return a
}

const getFontsOPTM = () => {
  var a = 200,
    e = Date.now(), // replaced get_cf_date
    n = []
  var o = ['sans-serif', 'monospace'],
    m = [0, 0],
    r = [0, 0],
    i = document['createElement']('div')
  i['style']['cssText'] =
    'position: relative; left: -9999px; visibility: hidden; display: block !important'
  var c
  for (c = 0; c < o['length']; c++) {
    var b = document['createElement']('span')
    b['innerHTML'] = 'abcdefhijklmnopqrstuvxyz1234567890;+-.'
    b['style']['fontSize'] = '90px'
    b['style']['fontFamily'] = o[c]
    i['appendChild'](b)
  }
  for (document['body']['appendChild'](i), c = 0; c < i['childNodes']['length']; c++) {
    // @ts-ignore
    b = i['childNodes'][c]
    m[c] = b['offsetWidth']
    r[c] = b['offsetHeight']
  }
  document['body']['removeChild'](i)

  if (Date.now() - e > a) return n // replaced get_cf_date

  var d = [
      'Geneva',
      'Lobster',
      'New York',
      'Century',
      'Apple Gothic',
      'Minion Pro',
      'Apple LiGothic',
      'Century Gothic',
      'Monaco',
      'Lato',
      'Fantasque Sans Mono',
      'Adobe Braille',
      'Cambria',
      'Futura',
      'Bell MT',
      'Courier',
      'Courier New',
      'Calibri',
      'Avenir Next',
      'Birch Std',
      'Palatino',
      'Ubuntu Regular',
      'Oswald',
      'Batang',
      'Ubuntu Medium',
      'Cantarell',
      'Droid Serif',
      'Roboto',
      'Helvetica Neue',
      'Corsiva Hebrew',
      'Adobe Hebrew',
      'TI-Nspire',
      'Comic Neue',
      'Noto',
      'AlNile',
      'Palatino-Bold',
      'ArialHebrew-Light',
      'Avenir',
      'Papyrus',
      'Open Sans',
      'Times',
      'Quicksand',
      'Source Sans Pro',
      'Damascus',
      'Microsoft Sans Serif'
    ],
    k = document['createElement']('div')
  k['style']['cssText'] =
    'position: relative; left: -9999px; visibility: hidden; display: block !important'

  for (var l = [], s = 0; s < d['length']; s++) {
    var u = document['createElement']('div')

    for (c = 0; c < o['length']; c++) {
      var b = document['createElement']('span')
      b['innerHTML'] = 'abcdefhijklmnopqrstuvxyz1234567890;+-.'
      b['style']['fontSize'] = '90px'
      b['style']['fontFamily'] = d[s] + ',' + o[c]
      u['appendChild'](b)
    }

    k['appendChild'](u)
  }

  if (Date.now() - e > a) {
    // replaced get_cf_date
    return n
  }

  document['body']['appendChild'](k)

  for (var s = 0; s < k['childNodes']['length']; s++) {
    var _ = !1,
      // @ts-ignore
      u = k['childNodes'][s]

    for (c = 0; c < u['childNodes']['length']; c++) {
      // @ts-ignore
      var b = u['childNodes'][c]
      if (b['offsetWidth'] !== m[c] || b['offsetHeight'] !== r[c]) {
        _ = !0
        break
      }
    }

    if ((_ && l['push'](s), Date.now() - e > a)) break // replaced get_cf_date
  }

  document['body']['removeChild'](k)
  n = l['sort']()
  return n
}

const getCanvas = data => {
  // Akamai Source
  var h = -1
  var n = document['createElement']('canvas')
  if (
    ((n['width'] = 280),
    (n['height'] = 60),
    (n['style']['display'] = 'none'),
    'function' == typeof n['getContext'])
  ) {
    var command_codes = n['getContext']('2d')
    command_codes['fillStyle'] = 'rgb(102, 204, 0)'
    command_codes['fillRect'](100, 5, 80, 50)
    command_codes['fillStyle'] = '#f60'
    command_codes['font'] = '16pt Arial'
    command_codes['fillText'](data, 10, 40)
    command_codes['strokeStyle'] = 'rgb(120, 186, 176)'
    command_codes['arc'](80, 10, 20, 0, Math['PI'], false)
    command_codes['stroke']()
    var PL$42 = n['toDataURL']()
    /** @type {number} */
    h = 0
    /** @type {number} */
    var PL$41 = 0
    for (; PL$41 < PL$42['length']; PL$41++) {
      h = (h << 5) - h + PL$42['charCodeAt'](PL$41)
      /** @type {number} */
      h = h & h
    }
    // @ts-ignore
    h = h['toString']()
  }

  return h
}

const getRCFP = () => {
  let rCFP = []

  for (let rVal = 0; rVal < 1000; rVal++) {
    var high = document['createElement']('canvas')
    /** @type {number} */
    high['width'] = 16
    /** @type {number} */
    high['height'] = 16
    var umecob = high['getContext']('2d')
    umecob['font'] = '6pt Arial'
    umecob['fillText'](rVal.toString(), 1, 12)
    var PL$120 = high['toDataURL']()
    /** @type {number} */
    var hash = 0
    /** @type {number} */
    var PL$24 = 0
    for (; PL$24 < PL$120['length']; PL$24++) {
      hash = (hash << 5) - hash + PL$120['charCodeAt'](PL$24)
      /** @type {number} */
      hash = hash & hash
    }
    rCFP[rVal] = hash['toString']()
  }

  return rCFP
}

async function handler(handler: Handler) {
  const nav = navigator as any

  const plugins: string[] = []
  for (let i = 0; i < nav.plugins.length; i++) {
    plugins.push(nav.plugins.item(i).name)
  }

  const browserFeatures = {
    navigator: {
      userAgent: nav.userAgent, // String
      language: nav.language, // String
      productSub: nav.productSub, // String
      product: nav.product, // String
      plugins: {
        count: nav.plugins ? nav.plugins.length : -1, // Number
        names: plugins // String Array
      },
      onLine: nav.onLine ? nav.onLine : true, // Boolean // Custom set default to true cos it makes sense...
      vibrate: typeof nav.vibrate === 'function', // Boolean
      getBattery: typeof nav.getBattery === 'function', // Boolean
      credentials: Boolean(nav.credentials), // Boolean
      appMinorVersion: Boolean(nav.appMinorVersion), // Boolean
      bluetooth: Boolean(nav.bluetooth), // Boolean
      storage: Boolean(nav.storage), // Boolean
      getGamepads: Boolean(nav.getGamepads), // Boolean
      getStorageUpdates: Boolean(nav.getStorageUpdates), // Boolean
      hardwareConcurrency: Boolean(nav.hardwareConcurrency), // Boolean
      mediaDevices: Boolean(nav.mediaDevices), // Boolean
      mozAlarms: Boolean(nav.mozAlarms), // Boolean
      mozConnection: Boolean(nav.mozConnection), // Boolean
      mozIsLocallyAvailable: Boolean(nav.mozIsLocallyAvailable), // Boolean
      mozPhoneNumberService: Boolean(nav.mozPhoneNumberService), // Boolean
      msManipulationViewsEnabled: Boolean(nav.msManipulationViewsEnabled), // Boolean
      permissions: Boolean(nav.permissions), // Boolean
      registerProtocolHandler: Boolean(nav.registerProtocolHandler), // Boolean
      requestMediaKeySystemAccess: Boolean(nav.requestMediaKeySystemAccess), // Boolean
      requestWakeLock: Boolean(nav.requestWakeLock), // Boolean
      sendBeacon: Boolean(nav.sendBeacon), // Boolean
      serviceWorker: Boolean(nav.serviceWorker), // Boolean
      storeWebWideTrackingException: Boolean(nav.storeWebWideTrackingException), // Boolean
      webkitGetGamepads: Boolean(nav.webkitGetGamepads), // Boolean
      webkitTemporaryStorage: Boolean(nav.webkitTemporaryStorage), // Boolean
      webdriver: Boolean(nav.webdriver), // Boolean
      cookieEnabled: Boolean(nav.cookieEnabled), // Boolean
      javaEnabled: nav.javaEnabled ? nav.javaEnabled() : false, // Boolean
      doNotTrack: nav.doNotTrack ? nav.doNotTrack : -1, // Either string or -1
      parseInt: Boolean(Number.parseInt), // Boolean
      Math: {
        hypot: Boolean(Math.hypot), // Boolean
        imul: Boolean(Math.imul) // Boolean
      }
    },
    screen: {
      width: screen ? screen.width : -1, // Number
      height: screen ? screen.height : -1, // Number
      availWidth: screen ? screen.availWidth : -1, // Number
      availHeight: screen ? screen.availHeight : -1, // Number
      colorDepth: screen ? screen.colorDepth : -1, // Number
      pixelDepth: screen ? screen.pixelDepth : -1, // Number
      innerWidth: window.innerWidth || document.body.clientWidth, // Number
      innerHeight: window.innerHeight || document.body.clientHeight, // Number
      // @ts-ignore
      outerWidth: window.outerWidth || document.body.outerWidth, // Number
      // @ts-ignore
      mozInnerScreenY: 'mozInnerScreenY' in window ? window.mozInnerScreenY : 0 // Number
    },
    window: {
      addEventListener: Boolean(window.addEventListener), // Boolean
      XMLHttpRequest: Boolean(window.XMLHttpRequest), // Boolean
      // @ts-ignore
      XDomainRequest: Boolean(window.XDomainRequest), // Boolean
      // @ts-ignore
      buffer: Boolean(window.Buffer), // Boolean
      // @ts-ignore
      emit: Boolean(window.emit), // Boolean
      DeviceOrientationEvent: Boolean(window.DeviceOrientationEvent), // Boolean
      DeviceMotionEvent: Boolean(window.DeviceMotionEvent), // Boolean
      TouchEvent: Boolean(window.TouchEvent), // Boolean
      PointerEvent: Boolean(window.PointerEvent), // Boolean
      // @ts-ignore
      domAutomation: Boolean(window.domAutomation), // Boolean
      Function: {
        'return/*@cc_on!@*/!1': new Function('return/*@cc_on!@*/!1')(), // Boolean
        bind: Boolean(Function.prototype.bind) // Boolean
      },
      Array: {
        forEach: Boolean(Array.prototype.forEach) // Boolean
      },
      // @ts-ignore
      spawn: Boolean(window.spawn), // Boolean
      // @ts-ignore
      chrome: Boolean(window.chrome), // Boolean
      // @ts-ignore
      _phantom: Boolean(window._phantom), // Boolean
      // @ts-ignore
      webdriver: Boolean(window.webdriver), // Boolean
      // @ts-ignore
      callPhantom: Boolean(window.callPhantom), // Boolean
      // @ts-ignore
      opera: Boolean(window.opera), // Boolean
      sessionStorage: Boolean(window.sessionStorage), // Boolean
      localStorage: Boolean(window.localStorage), // Boolean
      indexedDB: Boolean(window.indexedDB), // Boolean
      // @ts-ignore
      InstallTrigger: typeof InstallTrigger !== 'undefined', // Boolean
      FileReader: 'FileReader' in window, // Boolean
      HTMLElement:
        window.HTMLElement &&
        Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0, // Boolean
      webRTC:
        typeof window.RTCPeerConnection === 'function' ||
        // @ts-ignore
        typeof window.mozRTCPeerConnection === 'function' ||
        typeof window.webkitRTCPeerConnection === 'function' // Boolean
    },
    document: {
      // @ts-ignore
      documentMode: typeof document.documentMode, // String
      // @ts-ignore
      XPathResult: void 0 !== window.XPathResult || void 0 !== document.XPathResult, // Boolean
      hidden: document.hidden !== void 0, // Boolean
      // @ts-ignore
      mozHidden: document.mozHidden !== void 0, // Boolean
      // @ts-ignore
      msHidden: document.msHidden !== void 0, // Boolean
      // @ts-ignore
      webkitHidden: document.webkitHidden !== void 0, // updoot // Boolean
      driver: document.documentElement.getAttribute('driver') !== null, //Boolean
      webdriver: document.documentElement.getAttribute('webdriver') !== null, // Boolean
      selenium: document.documentElement.getAttribute('selenium') !== null, // Boolean
      cdc_asdjflasutopfhvcZLmcfl_: Boolean(
        // @ts-ignore
        window.$cdc_asdjflasutopfhvcZLmcfl_ || document.$cdc_asdjflasutopfhvcZLmcfl_
      ) // Boolean
    },
    canvas: {
      '<@nv45. F1n63r,Pr1n71n6!': getCanvas('<@nv45. F1n63r,Pr1n71n6!'), // Number-String
      'm,Ev!xV67BaU> eh2m<f3AG3@': getCanvas('m,Ev!xV67BaU> eh2m<f3AG3@') // Number-String
    },
    rCFP: getRCFP(), // Number-String Array
    fonts_optm: getFontsOPTM(), // Int Array
    fonts: getFonts(), // Int Array
    np: await getNP(), // Number
    mr: getMR() // Comma separated number-string
  }

  handler.send('browser', { ...browserFeatures })
}

export default handler
