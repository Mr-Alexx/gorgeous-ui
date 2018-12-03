const path = require('path')
const version = process.env.NODE_ENV || require('../package.json').version
const fs = require('fs')
let content = {'1.0.0': '1.0'}

!content[version] && (content[version] = '1.0')
fs.writeFileSync(path.resolve(__dirname, '../examples/version.json'), JSON.stringify(content))
