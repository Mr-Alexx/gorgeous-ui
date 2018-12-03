import Button from './button'

/* istanbul ignore next */
Button.install = function (Vue) {
  Vue.component(Button.name, Button)
}

export default Button
