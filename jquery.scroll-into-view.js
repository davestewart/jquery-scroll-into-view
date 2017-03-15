/**
 * Scroll Into View plugin
 *
 * Scrolls an element into view, with a few helpful features / options
 *
 * @see https://github.com/davestewart/jquery-scroll-into-view
 * @author Dave Stewart
 * @date 14 March 2017
 */
(function ($) {
  /**
   * @property  {Number|String|HTMLElement}   vt          Viewport top; can be a number, selector or element
   * @property  {Number|String|HTMLElement}   vb          Viewport bottom; can be a number, selector or element
   * @property  {Number|String}               pt          Padding top; can be a number, string percent value, or the string 'auto'
   * @property  {Number}                      pb          Padding bottom
   * @property  {Object|Function}             bounds      Custom bounds; pass in a bounds object {top, bottom, height} or a function that returns the same: getBounds(elements)
   * @property  {Function}                    fn          Optional scroll function to call instead of the default; scrollTo(value, options, values)
   * @property  {Boolean}                     force       Force the element to scroll into position, even if it's already on-screen
   * @property  {Number}                      duration    Scroll duration; in milliseconds
   */
  var defaults = {
    vt: 0,
    vb: 0,
    pt: 20,
    pb: 20,
    bounds: null,
    fn: null,
    force: false,
    duration: 400
  }

  // helper functions
  function getAllElements (elements) {
    return $(elements)
      .map(function (i, e) {
        return $(e).get(0)
      })
      .toArray()
  }

  function getHeight (value) {
    return typeof value === 'number'
      ? value
      : $(value).height()
  }

  function getElementBounds (element) {
    var b = element.getBoundingClientRect()
    return {
      top: b.top,
      bottom: b.bottom,
      height: b.height
    }
  }

  function getSelectionBounds (elements) {
    var bounds = null
    getAllElements(elements)
      .forEach(function (element) {
        var b = getElementBounds(element)
        if (!bounds) {
          bounds = b
        }
        else {
          if (b.top < bounds.top) {
            bounds.top = b.top
          }
          if (b.bottom > bounds.bottom) {
            bounds.bottom = b.bottom
          }
        }
      })
    bounds.height = bounds.bottom - bounds.top
    return bounds
  }

  function scrollTo (value, options) {
    $('html, body').animate({scrollTop: value}, options.duration)
  }

  // main function
  function scroll (elements, opts) {
    // options
    var options = $.extend({}, defaults, opts)

    // window
    var wh = getHeight(window)
    var wy = document.body.scrollTop

    // viewport
    var vt = getHeight(options.vt)
    var vb = getHeight(options.vb)
    var vh = wh - vt - vb

    // bounds
    var bounds = options.bounds
      ? typeof options.bounds === 'function'
        ? options.bounds(elements)
        : options.bounds
      : getSelectionBounds(elements)

    // padding
    var pt = options.pt
    var pb = options.pb

    // calculation for string padding
    if (pt === 'auto') {
      pt = '50%'
    }
    if (/^\d+%$/.test(String(pt))) {
      var pc = parseInt(pt) / 100
      var pd = vh - bounds.height
      pt = Math.floor(pd * pc)
      pb = Math.floor(pd * (1 - pc))
    }

    // element bounds
    var eh = bounds.height + pt + pb
    var et = bounds.top - pt
    var eb = bounds.bottom + pb

    // offset
    var ot = et - vt
    var ob = eb - vt - vh

    // final values
    var fn = options.fn || scrollTo
    var values = {wh: wh, wy: wy, vt: vt, vb: vb, vh: vh, pt: pt, pb: pb, eh: eh, et: et, eb: eb, ot: ot, ob: ob}

    // scroll
    if (ot <= 0 || (ob >= 0 && eh > vh) || options.force) {
      fn(wy + ot, options, values)
    }
    else if (ob > 0) {
      fn(wy + ob, options, values)
    }
  }

  // jQuery plugin function
  var scrollIntoView = function (options) {
    scroll(this.toArray(), options)
    return this
  }

  // set / get default options
  scrollIntoView.options = function (options) {
    if (options) {
      $.extend(defaults, options)
    }
    return defaults
  }

  // assign plugin
  $.fn.scrollIntoView = scrollIntoView
})(jQuery)
