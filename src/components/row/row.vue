<template>
  <component
    :style="style"
    :class="classes"
    :is="tag">
    <slot></slot>
  </component>
</template>

<script>
import { oneOf } from '../../utils/common.js'

export default {
  name: 'GgRow',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: [Number, String],
    flex: Boolean,
    justify: { // 水平对齐方式
      validator (value) {
        return oneOf(value, ['start', 'end', 'center', 'space-around', 'space-between'])
      },
      default: 'start'
    },
    align: { // 垂直对齐方式
      validator (value) {
        return oneOf(value, ['top', 'middle', 'bottom'])
      },
      default: 'top'
    }
  },
  computed: {
    classes () {
      return [
        'gg-row',
        {
          'gg-row--flex': this.flex,
          [`is-justify-${this.justify}`]: this.justify && this.justify !== 'start',
          [`is-align-${this.align}`]: this.align && this.align !== 'top'
        }
      ]
    },
    style () {
      let style = {}
      if (this.gutter && !isNaN(this.gutter)) {
        style.marginLeft = `-${this.gutter / 2}px`
        style.marginRight = style.marginLeft
      }
      return style
    }
  }
}
</script>
