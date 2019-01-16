// 判断参数是否是数组内的一个
export function oneOf (target, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (target === validList[i]) return true
  }
  return false
}

// 向上找指定组件'实例'
export function findComponentUpward (context, componentName) {
  let parent = context.$parent // 组件的父组件

  while (parent && parent.$options.name !== componentName) {
    parent = parent.$parent
  }

  return parent
}

// 向下找指定名称的所有组件
export function findComponentsDownward (context, componentName) {
  let children = context.$children || []
  let _children = []

  if (children.length) {
    children.forEach(child => {
      if (child.$options.name === componentName) {
        _children.push(child)
      }
      // 继续搜寻子组件内是否存在指定的component
      const findInChild = findComponentsDownward(child, componentName)
      _children.concat(findInChild)
    })
  }
  return _children
}
