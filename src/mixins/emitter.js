/**
 * 自定义实现的组件通信方法
 */

// 祖先元素向指定componentName的子孙元素广播事件
const broadcast = (componentName, eventName, params) => {
  this.$children.forEach(child => {
    const name = child.$options.componentName

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      // 找到为止
      broadcast.apply(child, [componentName, eventName].concat(params))
    }
  })
}

export default {
  methods: {
    broadcast (componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    },
    // 子孙组件触发指定componentName祖先元素的事件
    dispatch (componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name // componentName不存在
      // 当且仅当祖先元素存在,
      // 并且'不存在组件名'或者'组件名与指定组件名不一致'时,
      // 执行该循环
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      // 存在祖先元素,则触发祖先元素的事件
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    }
  }
}
