<template>
  <label class="gg-radio" :class="classes">
    <span class="gg-radio__inner"></span>
    <input
      type="radio"
      :disabled="isDisabled"
      :checked="checkValue"
      :name="name"
      @change="handleChange"
      class="gg-radio__origin">
    <span v-if="label || $slots.default" class="gg-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
import { findComponentUpward } from '@/utils/common.js'
import Emitter from '@/mixins/emitter.js'

export default {
  name: 'GgRadio',
  mixins: [Emitter],
  props: {
    label: {}, // 不作限制
    disabled: Boolean,
    name: String
  },
  data () {
    return {
      isGroup: false,
      checkValue: '',
      parent: null
    }
  },
  computed: {
    isDisabled () {
      return this.isGroup ? this.parent.disabled : this.disabled
    },
    classes () {
      return [
        { 'is-checked': this.checkValue },
        { 'is-disabled': this.isDisabled }
      ]
    }
  },
  watch: {
    value (val) {
      this.checkValue = val
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'GgradioGroup')
    this.isGroup = !!this.parent
    if (this.isGroup) {
      this.parent.updateModel(true)
    }
  },
  methods: {
    handleChange (event) {
      if (this.disabled) return false

      const checked = event.target.checked
      this.checkValue = checked
      this.$emit('input', checked)

      if (this.isGroup) {
        // 若是radio-group形式,则由radio-group进行数据更新
        this.parent.change(this.model)
      } else {
        // 否则指定单个radio更新
        this.$emit('change', checked) // 对外提供自定义的chang方法(@on-change)
        this.dispatch('GgFormItem', 'on-form-change', checked) // 被form-item包围,则还要通知更新
      }
    }
  }
}
</script>
