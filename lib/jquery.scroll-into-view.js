(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

function getAllElements(elements) {
  return $(elements).map(function (i, e) {
    return $(e).get(0);
  }).toArray();
}

function getHeight(value) {
  if (typeof value === 'number') {
    return value;
  }
  var $element = $(value);
  return $element.is(':visible') ? $element.outerHeight() : 0;
}

function getElementBounds(element) {
  var b = element.getBoundingClientRect();
  return {
    top: b.top,
    bottom: b.bottom,
    height: b.height
  };
}

function getSelectionBounds(elements) {
  var bounds = null;
  elements.forEach(function (element) {
    if ($(element).is(':visible')) {
      // don't include invisible elements
      var b = getElementBounds(element);
      if (!bounds) {
        bounds = b;
      } else {
        if (b.top < bounds.top) {
          bounds.top = b.top;
        }
        if (b.bottom > bounds.bottom) {
          bounds.bottom = b.bottom;
        }
      }
    }
  });
  bounds.height = bounds.bottom - bounds.top;
  return bounds;
}

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
};

function scrollTo(value, options) {
  $('html, body').stop(true).animate({ scrollTop: value }, options.duration);
}

var scroll = function (elements, opts) {
  // apply forced scrolling
  if ((typeof opts.force === 'string' || typeof opts.force === 'number') && !opts.pt) {
    opts.pt = opts.force;
    opts.force = true;
  }

  // options
  var options = $.extend({}, defaults, opts);

  // window
  var wh = $(window).height();
  var wy = document.body.scrollTop;

  // viewport
  var vt = getHeight(options.vt);
  var vb = getHeight(options.vb);
  var vh = wh - vt - vb;

  // bounds
  var bounds = options.bounds ? typeof options.bounds === 'function' ? options.bounds(elements) : options.bounds : getSelectionBounds(elements);

  // correct bottomless-bounds
  if (typeof bounds.bottom === 'undefined') {
    bounds.bottom = bounds.top + bounds.height;
  }

  // padding
  var pt = options.pt;
  var pb = options.pb;

  // calculation for string padding
  if (pt === 'auto') {
    pt = '50%';
  }
  if (/^\d+%$/.test(String(pt))) {
    var pc = parseInt(pt) / 100;
    var pd = vh - bounds.height;
    pt = Math.floor(pd * pc);
    pb = Math.floor(pd * (1 - pc));
  }

  // element bounds
  var eh = bounds.height + pt + pb;
  var et = bounds.top - pt;
  var eb = bounds.bottom + pb;

  // offset
  var ot = et - vt;
  var ob = eb - vt - vh;

  // final values
  var fn = options.fn || scrollTo;
  var values = { wh: wh, wy: wy, vt: vt, vb: vb, vh: vh, pt: pt, pb: pb, eh: eh, et: et, eb: eb, ot: ot, ob: ob };

  // scroll
  if (ot <= 0 || ob >= 0 && eh > vh || !!options.force) {
    fn(wy + ot, options, values);
  } else if (ob > 0) {
    fn(wy + ob, options, values);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/**
 * Scroll Into View plugin
 *
 * Scrolls an element into view, with a few helpful features / options
 *
 * @see https://github.com/davestewart/jquery-scroll-into-view
 * @author Dave Stewart
 * @date 14 March 2017
 */
var scrollIntoView = function scrollIntoView(options) {
  var elements = getAllElements(this.toArray());
  if (elements.length) {
    scroll(elements, options || {});
  }
  return this;
};

// set / get default options
scrollIntoView.options = function (options) {
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options !== null) {
    jQuery.extend(defaults, options);
  }
  return defaults;
};

// assign plugin
jQuery.fn.scrollIntoView = scrollIntoView;

})));
//# sourceMappingURL=jquery.scroll-into-view.js.map
