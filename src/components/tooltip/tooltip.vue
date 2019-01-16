<template>
  <div
    class="gg-tooltip"
    @mouseenter="handleShow"
    @mouseleave="handleClose">
    <div class="gg-tooltip-ref" ref="ref">
      <slot></slot>
    </div>
    <transition name="fade">
      <div
        :class="classes"></div>
    </transition>
  </div>
</template>

<script>
import { oneOf } from '../../utils/common.js'

export default {
  name: 'GgTooltip',
  props: {
    placement: {
      validator (value) {
        return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'])
      },
      default: 'bottom'
    },
    theme: String,
    content: String,
    delay: {
      type: Number,
      default: 0
    },
    body: Boolean // append to body?
  }
}
</script>
