/**
 * 自动生成组件,优先检测组件是否存在
 * 组件名采用横线写法
 * 生成组件文件夹,内含 组件名.vue,index.js文件,并且填充基本内容
 * 生成 组件名.scss
 * components.json内添加 组件名: 路径
 */

'use strict'

console.log('========= new component =========')
process.on('exit', () => {
  console.log('========= exit =========')
})

// 命令构建时必须输入组件名,否则退出新建
if (!process.argv[2]) {
  console.error('组件名必填')
  process.exit(1)
}

const path = require('path')
const save = require('file-save') // 创建和保存文件
const uppercamelcase = require('uppercamelcase') // 转驼峰
const componentname = process.argv[2] // 原始组件参数
const ComponentName = uppercamelcase(componentname) // 转驼峰的组件参数
const ComponentPath = path.resolve(__dirname, '../src/components', componentname)

// 判断组件是否已创建
const componentsFile = require('../components.json')
if (componentsFile[componentname]) {
  console.error(`${componentname} 组件已存在`)
  process.exit(1)
}

// 添加到components.json
componentsFile[componentname] = `./src/components/${componentname}/index.js`
save(path.join(__dirname, '../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n')

// 定义index.scss内@import内容
let indexScssContent = '@import "base.scss";'
Object.keys(componentsFile).forEach((key) => {
  indexScssContent += `\n@import "${key}.scss";`
})

// 不存在时,定义文件内容,创建文件,写入到components.json内
const Files = [
  {
    // 创建index.js文件,导入组件,并挂在到Vuecomponent上
    filename: 'index.js',
    // 不要缩进,不然创建的文件会带缩进
    content: `import ${ComponentName} from './${componentname}'

/* istanbul ignore next */
${ComponentName}.install = function (Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName})
}

export default ${ComponentName}`
  },
  {
    // 创建 组件名.vue文件,定义初始内容
    filename: `${componentname}.vue`,
    content: `<template>
  <div class="gg-${componentname}"></div>
</template>

<script>
export default {
  name: 'Gg${ComponentName}'
}
</script>`
  },
  {
    // 在styles的theme-chalk下创建 组件名.scss,定义初始内容
    filename: path.join('../../styles/theme-chalk', `${componentname}.scss`),
    content: `@import "../common/var.scss";
@import "../mixins/mixins.scss";

@include b(${componentname}) {

}`
  },
  {
    // 定义index.scss的内容
    filename: '../../styles/theme-chalk/index.scss',
    content: indexScssContent
  }
]

// 创建component文件夹及内容
Files.forEach(file => {
  save(path.join(ComponentPath, file.filename))
  .write(file.content, 'utf8')
  .end('\n')
})

console.log('========= Done! =========')
