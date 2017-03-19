import {getAllElements} from './helpers'
import defaults from './defaults'
import scroll from  './scroll'

/**
 * Scroll Into View plugin
 *
 * Scrolls an element into view, with a few helpful features / options
 *
 * @see https://github.com/davestewart/jquery-scroll-into-view
 * @author Dave Stewart
 * @date 14 March 2017
 */
let scrollIntoView = function (options) {
  const elements = getAllElements(this.toArray())
  if (elements.length) {
    scroll(elements, options || {})
  }
  return this
}

// set / get default options
scrollIntoView.options = function (options) {
  if (typeof options === 'object' && options !== null) {
    jQuery.extend(defaults, options)
  }
  return defaults
}

// assign plugin
jQuery.fn.scrollIntoView = scrollIntoView
