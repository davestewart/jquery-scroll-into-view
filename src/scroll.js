import defaults from './defaults'

import {
  getHeight,
  getSelectionBounds
} from './helpers'

function scrollTo (value, options) {
    $('html, body').stop(true).animate({scrollTop: value}, options.duration)
}

export default function (elements, opts) {
  // apply forced scrolling
  if ((typeof opts.force === 'string' || typeof opts.force === 'number') && ! opts.pt) {
      opts.pt = opts.force
      opts.force = true
  }

  // options
  const options = $.extend({}, defaults, opts)

  // window
  const wh = $(window).height()
  const wy = document.body.scrollTop

  // viewport
  const vt = getHeight(options.vt)
  const vb = getHeight(options.vb)
  const vh = wh - vt - vb

  // bounds
  const bounds = options.bounds
    ? typeof options.bounds === 'function'
      ? options.bounds(elements)
      : options.bounds
    : getSelectionBounds(elements)

  // correct bottomless-bounds
  if (typeof bounds.bottom === 'undefined') {
    bounds.bottom = bounds.top + bounds.height
  }

  // padding
  let pt = options.pt
  let pb = options.pb

  // calculation for string padding
  if (pt === 'auto') {
    pt = '50%'
  }
  if (/^\d+%$/.test(String(pt))) {
    const pc = parseInt(pt) / 100
    const pd = vh - bounds.height
    pt = Math.floor(pd * pc)
    pb = Math.floor(pd * (1 - pc))
  }

  // element bounds
  const eh = bounds.height + pt + pb
  const et = bounds.top - pt
  const eb = bounds.bottom + pb

  // offset
  const ot = et - vt
  const ob = eb - vt - vh

  // final values
  const fn = options.fn || scrollTo
  const values = {wh: wh, wy: wy, vt: vt, vb: vb, vh: vh, pt: pt, pb: pb, eh: eh, et: et, eb: eb, ot: ot, ob: ob}

  // scroll
  if (ot <= 0 || (ob >= 0 && eh > vh) || !!options.force) {
    fn(wy + ot, options, values)
  }
  else if (ob > 0) {
    fn(wy + ob, options, values)
  }
}
