<template>
  <component
    :is="tagName"
    @click="handleClick"
    :disabled="disabled || loading"
    :class="classes"
    :href="to"
    :target="target">
    <i class="gg-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </component>
</template>

<script>
import { oneOf } from '@/utils/common.js'

const prefixClass = 'gg-button'

export default {
  name: 'GgButton',
  props: {
    size: {
      type: String,
      default: 'default'
    },
    type: {
      validator (value) {
        return oneOf(value, ['text', 'default', 'primary', 'info', 'success', 'warning', 'danger', 'fancy', 'secondary'])
      },
      default: 'default'
    },
    shape: {
      validator (value) {
        return oneOf(value, ['round', 'default', 'circle'])
      },
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    },
    loading: Boolean,
    disabled: Boolean,
    to: String,
    target: String,
    shadow: Boolean,
    light: Boolean
  },
  computed: {
    classes () {
      return [
        prefixClass,
        `${prefixClass}--${this.type}`,
        {
          [`${prefixClass}--${this.size}`]: this.size !== 'default' && this.size,
          [`is-${this.shape}`]: this.shape !== 'default' && this.shape,
          [`${prefixClass}--text`]: this.text,
          'is-disabled': this.disabled || this.loading,
          [`${prefixClass}--shadow`]: this.shadow,
          'is-light': this.light
        }
      ]
    },
    tagName () {
      return this.to ? 'a' : 'button'
    }
  },
  methods: {
    handleClick (event) {
      // 透传click事件
      this.$emit('click', event)
    }
  }
}
</script>
