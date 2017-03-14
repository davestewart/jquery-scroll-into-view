/**
 * Scroll Into View plugin
 *
 * Scrolls an element into view, with a few helpful features / options
 *
 * @see https://github.com/davestewart/jquery-scroll-into-view
 * @author Dave Stewart
 * @date 14 March 2017
 */
(function ($, window, document, undefined) {
  'use strict'

  /**
   * @property  {Number|String|HTMLElement}   vt          Viewport top; can be a number, selector or element
   * @property  {Number|String|HTMLElement}   vb          Viewport bottom; can be a number, selector or element
   * @property  {Number|String}               pt          Padding top; can be a number, string percent value, or the string 'auto'
   * @property  {Number}                      pb          Padding bottom
   * @property  {Number}                      duration    Scroll duration; in milliseconds
   * @property  {Boolean}                     force       Force the element to scroll into position, even if it's already on-screen
   * @property  {Function}                    fn          Optional function to call instead of the default. Takes a pixel value and duration as its 2 arguments
   */
  var defaults = {
    vt: 0,
    vb: 0,
    pt: 20,
    pb: 20,
    duration: 400,
    fn: null
  }

  // constants
  var $parent = $('html, body')
  var $body = $('body')

  // helper functions
  function getHeight (value) {
    return typeof value === 'number'
      ? value
      : $(value).height()
  }

  function scrollTo (value, options) {
    $parent.animate({scrollTop: value, duration: options.duration})
  }

  // main function
  function scroll (element, opts) {
    // options
    var options = $.extend({}, defaults, opts)
    var bounds = element.getBoundingClientRect()

    // window
    var wh = getHeight(window)
    var wy = $body.scrollTop()

    // viewport
    var vt = getHeight(options.vt)
    var vb = getHeight(options.vb)
    var vh = wh - vt - vb

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

    // element (absolute)
    var eh = bounds.height + pt + pb
    var et = bounds.top - pt
    var eb = bounds.bottom + pb

    // offset
    var ot = et - vt
    var ob = eb - vt - vh

    // final values
    var fn = options.fn || scrollTo
    var values = {wh, wy, vt, vb, vh, pt, pb, eh, et, eb, ot, ob}

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
    scroll(this.get(0), options)
    return this
  }

  // convenience method to set defaults
  scrollIntoView.defaults = function (options) {
    if (options) {
      $.extend(defaults, options)
    }
    return defaults
  }

  // assign plugin
  $.fn.scrollIntoView = scrollIntoView
})(jQuery, window, document)
