<template>
  <div class="gg-form-item">
    <label
      :for="labelFor"
      :class="['gg-form-item__label', {'is-required': isrequired || required}]"
      :style="labelStyle"
      v-if="label || $slot.label">
      <slot name="label">{{ label }}</slot>
    </label>
    <div
      class="gg-form-item__content"
      :style="contentStyle">
      <slot></slot>
      <transition name="gg-zoom-in-top">
        <div class="gg-form-item__error" v-if="validateState === 'error'">{{ validateMsg }}</div>
      </transition>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
import Emitter from '../../mixins/emitter.js'

export default {
  name: 'GgFormItem',
  mixins: [Emitter],
  inject: ['form'], // 引用form组件实例
  props: {
    for: String,
    label: String,
    labelWidth: String, // 表单域标签宽度
    prop: String,
    required: Boolean // 是否必填,如不设置,则会根据表单规则自动生成
  },
  data () {
    return {
      initialValue: '', // 初始表单数据,reset用
      validateState: '', // 校验状态
      validateMsg: '' // 校验不通过时的提示消息
    }
  },
  computed: {
    labelFor () {
      return this.for || this.prop
    },
    labelStyle () {
      let style = {}
      const width = this.labelWidth || this.form.labelWidth
      if (width) {
        style.width = width
      }
      return style
    },
    contentStyle () {
      let style = {}
      const margin = this.labelWidth || this.form.labelWidth
      if (margin) {
        style.marginLeft = margin
      }
      return style
    },
    fieldValue () {
      // 从form实例中获取当前form-item绑定的值
      return this.form.model[this.prop]
    },
    isrequired () {
      const rules = this.getRules()
      let isrequired = false
      rules.every(rule => {
        isrequired = rule.required
      })
      return isrequired
    }
  },
  mounted () {
    // 传入prop时,在form组件中缓存当前form-item组件
    if (this.prop) {
      this.dispatch('GgForm', 'on-form-item-add', this)

      // 设置表单初始值备份
      let initialValue = this.fieldValue
      // 为select数据作铺垫
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }
      this.initialValue = initialValue

      // 设置校验规则及触发时机
      this.setRules()
    }
  },
  beforeDestroy () {
    // 销毁组件前,移除在form组件中的缓存
    this.dispatch('GgForm', 'on-form-item-remove', this)
  },
  methods: {
    // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
    getRules () {
      const rule = this.form.rules ? this.form.rules[this.prop] : []
      return [].concat(rule)
    },
    setRules () {
      this.$on('on-form-blur', this.onFieldBlur)
      this.$on('on-form-change', this.onFieldChange)
    },
    // 过滤出trigger设置为blur和change的rule,或者不设置trigger的rule
    getExpectRule (trigger) {
      const rules = this.getRules()
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    /**
     * @description 校验方法
     * @param {String} trigger 触发方式
     * @param {Function} callback 校验回调
     */
    validate (trigger, callback) {
      // 获取过滤后的规则
      const rules = this.getExpectRule(trigger)
      // 规则不存在直接通过验证
      if (!rules || rules.length === 0) return true

      this.validateState = 'validating...'
      // 调用校验
      let descriptor = {}
      let model = {}

      descriptor[this.prop] = rules
      model[this.prop] = this.fieldValue

      const validator = new AsyncValidator(descriptor)
      // 验证
      // firstFields字段
      // Invoke callback when the first validation rule of the specified field generates an error,
      // no more validation rules of the same field are processed. true means all fields
      validator.validate(model, { firstFields: true }, (errors, fields) => {
        this.validateState = errors ? 'error' : 'success'
        this.validateMsg = errors ? errors[0].message : ''
        if (typeof callback === 'function') {
          callback(this.validateMsg)
        }
      })
    },
    // 重置内容
    resetField () {
      this.validateState = ''
      this.validateMsg = ''
      this.fieldValue = this.initialValue
    },
    onFieldBlur () {
      this.validate('blur')
    },
    onFieldChange () {
      this.validate('change')
    }
  }
}
</script>
