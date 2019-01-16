<template>
  <form class="gg-form">
    <slot></slot>
  </form>
</template>

<script>
import formItem from './form-item.vue'

export default {
  name: 'GgForm',
  components: { formItem },
  provide () { // 向子孙组件提供form组件实例
    return {
      form: this
    }
  },
  props: {
    rules: {
      type: Object
    },
    model: {
      type: Object
    },
    labelWidth: String
  },
  data () {
    return {
      fileds: []
    }
  },
  created () {
    // 由于Vue组件的渲染是有内向外的,所以不能再mounted内监听以下事件
    // 增加form-item执行的事件(缓存form-item组件)
    this.$on('on-form-item-add', (field) => {
      field && this.fileds.push(field)
    })
    // 移除form-item执行的事件(移除form-item组件的缓存)
    this.$on('on-form-item-remove', (field) => {
      field.prop && this.fileds.splice(this.fileds.indexOf(field), 1)
    })
  },
  methods: {
    // 重置表单
    resetForm () {
      this.fileds.forEach(filed => {
        filed.resetField()
      })
    },
    // 校验
    validate (callback) {
      return new Promise((resolve, reject) => {
        let count = 0
        let valid = true
        this.fileds.forEach(filed => {
          filed.validate('', errors => {
            if (errors) {
              // 一旦有一个form-item不通过验证,调用reject
              valid = false
              return reject(valid)
            }
            if (++count === this.fileds.length) {
              // 全部通过校验时
              resolve(valid)
              typeof callback === 'function' && callback(valid)
            }
          })
        })
      })
    }
  }
}
</script>
