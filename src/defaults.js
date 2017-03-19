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
export default {
  vt: 0,
  vb: 0,
  pt: 20,
  pb: 20,
  bounds: null,
  fn: null,
  force: false,
  duration: 400
}
