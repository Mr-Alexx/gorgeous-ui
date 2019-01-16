<template>
  <div class="gg-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from '@/utils/common.js'
import Emitter from '@/mixins/emitter.js'

export default {
  name: 'GgCheckboxGroup',
  mixins: [Emitter],
  props: {
    value: Array,
    disabled: Boolean,
    min: Number, // 未实现
    max: Number // 未实现
  },
  data () {
    return {
      model: this.value
    }
  },
  watch: {
    value (val) {
      this.updateModel(true)
    }
  },
  methods: {
    // checkbox-group是通过checkbox label是否在model内来控制是否选中
    updateModel (isUpdate) {
      const children = findComponentsDownward(this, 'GgCheckbox')
      const { value } = this
      children.forEach(child => {
        child.model = value
        if (isUpdate) {
          child.checkValue = value.indexOf(child.label) > -1
        }
      })
    },
    change (value) {
      this.model = value
      this.$emit('input', value)
      this.$emit('change', value) // 对外提供自定义的chang方法(@on-change)
      this.dispatch('GgFormItem', 'on-form-change', value) // 被form-item包围,则还要通知更新
    }
  }
}
</script>
