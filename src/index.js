/* Automaticall generated by './build/build-entry.js' */

import Button from '../src/components/button'
import ButtonGroup from '../src/components/button-group'
import Col from '../src/components/col'
import Row from '../src/components/row'

const components = [
  Button,
  ButtonGroup,
  Col,
  Row
]

const install = function (Vue, opts = {}) {
  if (install.installed) return

  components.map(component => Vue.component(component.name, component))
}

Vue.prototype.$GORGEOUS = {
  size: opts.size || '',
  zIndex: opts.zIndex || 100
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.1.0',
  install,
  ...components
}