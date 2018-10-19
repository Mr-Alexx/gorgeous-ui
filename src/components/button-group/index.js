import GgButtonGroup from './button-group.vue'

GgButtonGroup.install = function (Vue) {
  Vue.component(GgButtonGroup.name, GgButton)
}

export default GgButtonGroup
