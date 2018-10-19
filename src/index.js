import ColorPicker from './components/color-picker'

const components = [
  ColorPicker
]

const install = function (Vue, opts = {}) {
  if (install.installed) return

  components.map(component => Vue.component(component.name, component))
}

// if use with <script src="xxx/gorgeous.js"><script>
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}
