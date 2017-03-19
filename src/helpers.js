function getAllElements (elements) {
  return $(elements)
    .map(function (i, e) {
      return $(e).get(0)
    })
    .toArray()
}

function getHeight (value) {
  if (typeof value === 'number') {
    return value
  }
  const $element = $(value)
  return $element.is(':visible')
      ? $element.outerHeight()
      : 0
}

function getElementBounds (element) {
  const b = element.getBoundingClientRect()
  return {
    top: b.top,
    bottom: b.bottom,
    height: b.height
  }
}

function getSelectionBounds (elements) {
  let bounds = null
  elements
    .forEach(function (element) {
      if ($(element).is(':visible')) { // don't include invisible elements
        const b = getElementBounds(element)
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
      }
    })
  bounds.height = bounds.bottom - bounds.top
  return bounds
}

export {
  getAllElements,
  getHeight,
  getElementBounds,
  getSelectionBounds
}
