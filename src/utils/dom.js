/**
 * @description add event listener for element
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    // IE
    return function (element, event, handler) {
      if (element && event) {
        element.attachEvent('on', event, handler)
      }
    }
  }
})()

/**
 * @description remove event listener from element
 */
export const off = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    // IE
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on', event, handler)
      }
    }
  }
})()
