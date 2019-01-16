<template>
  <label class="gg-checkbox" :class="classes">
    <span class="gg-checkbox__inner" :class="{ 'is-indeterminate': this.indeterminate && !checkValue }"></span>
    <input
      v-if="isGroup"
      type="checkbox"
      :disabled="isDisabled"
      :value="label"
      v-model="model"
      @change="handleChange"
      class="gg-checkbox__origin">
    <input
      v-else
      type="checkbox"
      :disabled="isDisabled"
      :checked="checkValue"
      @change="handleChange"
      class="gg-checkbox__origin">
    <span v-if="label || $slots.default" class="gg-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">
        {{ label }}
      </template>
    </span>
  </label>
</template>

<script>
/**
 * 这里解释一下checkbox-group时,input需要设置value和v-model为数组的原因
 * checked状态会控制v-model的数组是否push或者delete所设置的value对应的值
*/
import { oneOf, findComponentUpward } from '@/utils/common.js'
import Emitter from '@/mixins/emitter.js'

export default {
  name: 'GgCheckbox',
  mixins: [Emitter],
  props: {
    label: [String, Object],
    value: [Boolean, String, Number],
    trueValue: {
      type: [Boolean, String, Number],
      default: true
    },
    falseValue: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: Boolean,
    size: {
      // 未实现
      validator (val) {
        return oneOf(val, ['large', '', 'small', 'mini'])
      },
      default: ''
    },
    indeterminate: Boolean // 不确定状态
  },
  data () {
    return {
      checkValue: this.value === this.trueValue,
      isGroup: false,
      model: [],
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
      if (val === this.trueValue || val === this.falseValue) {
        this.updateCheckStatus()
      } else {
        throw new Error('Value must be trueValue or false Value.')
      }
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'GgCheckboxGroup')
    this.isGroup = !!this.parent
    if (this.isGroup) {
      this.parent.updateModel(true)
    }
  },
  methods: {
    handleChange (event) {
      if (this.disabled) return false

      const checked = event.target.checked
      const value = checked ? this.trueValue : this.falseValue

      this.checkValue = checked
      this.$emit('input', value)

      if (this.isGroup) {
        // 若是checkbox-goup形式,则由checkbox-group进行数据更新
        this.parent.change(this.model)
      } else {
        // 否则指定单个checkbox更新
        this.$emit('change', value) // 对外提供自定义的chang方法(@on-change)
        this.dispatch('GgFormItem', 'on-form-change', value) // 被form-item包围,则还要通知更新
      }
    },
    // 更新checkbox的状态,用传过来的value和trueValue作比较返回的结果
    updateCheckStatus () {
      this.checkValue = this.value === this.trueValue
    }
  }
}
</script>
