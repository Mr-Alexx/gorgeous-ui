<template>
  <div :class="inputClass">
    <!-- 前置的元素 -->
    <span class="gg-input__prepend" v-if="$slots.prepend || prepend">
      <slot name="prepend"></slot>
    </span>
    <!-- 前置icon -->
    <span class="gg-input__prefix" v-if="$slots.prefix || prefix">
      <slot name="prefix"></slot>
      <!-- 没有slot时才显示icon -->
      <i :class="`gg-icon-${prefix}`" v-if="prefix"></i>
    </span>
    <input
      class="gg-input__inner"
      :type="type"
      :autocomplete="autocomplete"
      :min-length="minLength"
      :max-length="maxLength"
      :placeholder="placeholder"
      :value="currentValue"
      @input="handleInput"
      @blur="handleBlur"
      @change="handleChange"
      ref="input"
      :disabled="readonly || disabled">
    <!-- 后置元素 -->
    <span class="gg-input__append" v-if="$slots.append || append">
      <slot name="append"></slot>
    </span>
    <!-- 后置icon -->
    <span class="gg-input__suffix" v-if="$slots.suffix || suffix || showClear">
      <i class="gg-icon-circle-close gg-input__clear" v-if="showClear" @click="clear"></i>
      <template v-else>
        <slot name="suffix"></slot>
        <i :class="`gg-icon-${suffix}`" v-if="suffix"></i>
      </template>
    </span>
    <!-- search -->
    <span
      :class="searchClass"
      v-if="$slots.search || search"
      @click="handleSearch">
      <i class="gg-icon-search" v-if="searchButton === undefined || searchButton === ''"></i>
      <span v-else>{{ searchButton }}</span>
    </span>
  </div>
</template>

<script>
import Emitter from '../../mixins/emitter.js'

export default {
  name: 'GgInput',
  mixins: [ Emitter ],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: String,
    minLength: Number,
    maxLength: Number,
    placeholder: String,
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    size: String,
    readonly: Boolean,
    icon: String, // 尾部图标(默认)
    prefix: String, // 头部图标
    suffix: String, // 尾部图标
    prepend: String, // 前置元素内容
    append: String, // 后置元素内容
    search: Boolean, // 是否显示为搜索框
    searchButton: String, // 搜索按钮,不穿则是search icon
    autocomplete: { // 原生的自动完成功能，可选值为 off 和 on
      type: String,
      default: 'off'
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  computed: {
    inputClass () {
      return [
        'gg-input',
        this.disabled || this.readonly ? 'is-disabled' : '',
        this.size ? 'gg-input--' + this.size : '',
        this.prefix ? 'gg-input--prefix' : '',
        this.suffix || this.showClear ? 'gg-input--suffix' : '',
        this.append || this.prepend || this.searchButton !== undefined ? 'gg-input--group' : '',
        this.search ? 'gg-input--search' : '',
        this.prepend ? 'gg-input--prepend' : '',
        this.append || this.searchButton !== undefined ? 'gg-input--append' : ''
      ]
    },
    searchClass () {
      return [
        'gg-input__search',
        this.searchButton !== undefined ? 'gg-input__search--button' : ''
      ]
    },
    showClear () {
      return this.clearable &&
        !this.disabled &&
        !this.readonly &&
        !!this.currentValue
    }
  },
  watch: {
    // 监听父组件传过来的值变化
    value (val) {
      this.currentValue = val
    }
  },
  mounted () {
    console.log(this.showClear)
  },
  methods: {
    handleInput (event) {
      const value = event.target.value
      this.currentValue = value
      // 修改父组件的value
      this.$emit('input', value)
      // 触发form-item的change事件
      this.dispatch('GgFormItem', 'on-form-change', value)
    },
    handleBlur () {
      // 触发form-item的blur事件,用于验证
      this.dispatch('GgFormItem', 'on-form-blur', this.currentValue)
    },
    handleChange (event) {
      // 修改父组件的value
      this.$emit('change', event.target.value)
    },
    handleSearch () {
      // 激活input框
      this.$refs.input.focus()
      this.$emit('click')
    },
    // 清空按钮
    clear () {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    }
  }
}
</script>
