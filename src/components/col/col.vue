<template>
  <component
    :is="tag"
    :class="classes"
    :style="style">
    <slot></slot>
  </component>
</template>

<script>
import { findComponentUpward, oneOf } from '../../utils/common.js'
const prefixClass = 'gg-col'

export default {
  name: 'GgCol',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    span: [Number, String],
    offset: [Number, String],
    push: [Number, String],
    pull: [Number, String],
    xs: [Number, String, Object],
    sm: [Number, String, Object],
    md: [Number, String, Object],
    lg: [Number, String, Object],
    xl: [Number, String, Object]
  },
  computed: {
    style () {
      const parent = findComponentUpward(this, 'GgRow')
      const gutter = parent ? parent.gutter : 0
      let style = {}
      if (gutter) {
        style.paddingLeft = `${gutter / 2}px`
        style.paddingRight = style.paddingLeft
      }
      return style
    },
    classes () {
      let classes = [prefixClass]; // 此分号必须加上

      // gg-col-1 gg-col-offset-1...
      ['span', 'offset', 'pull', 'push'].forEach(prop => {
        if (this[prop] || this[prop] === 0 || this[prop] === '0') {
          classes.push(
            prop === 'span'
              ? `${prefixClass}-${this[prop]}`
              : `${prefixClass}-${prop}-${this[prop]}`
          )
        }
      }); // 此分号必须加上

      // gg-col-xs-1... gg-col-xs-offset-1...
      ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
        if (!isNaN(this[size])) {
          classes.push(`${prefixClass}-${size}-${this[size]}`)
        } else if (typeof this[size] === 'object') {
          let props = this[size]
          Object.keys(props).forEach(prop => {
            classes.push(
              prop === 'span'
                ? `${prefixClass}-${size}-${props[prop]}`
                : `${prefixClass}-${size}-${prop}-${props[prop]}`
            )
          })
        }
      })

      return classes
    }
  }
}
</script>
