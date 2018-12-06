/**
 * @description 以下方法基本操作iview的utils包内的assist.js文件
 * iview官网: https://www.iviewui.com/
 */
// 判断参数是否是数组内的一个
export const oneOf = (target, validList) => {
  for (let i = 0; i < validList.length; i++) {
    if (target === validList[i]) return true
  }
  return false
}

// 向上找指定组件
export const findComponentUpward= (context, componentName) => {
  let parent = context.$parent // 组件的父组件

  while (parent && parent.$options.name !== componentName) {
    parent = parent.$parent
  }

  return parent
}
