// build脚本
const fs = require('fs')
const path = require('path')
const pack = require('./pack/index')

const configPath = path.resolve(__dirname, 'pack.config.js')

const config = require(configPath)

// 打包成字符串
const result = pack(config)

// 将结果写入文件
try {
  fs.writeFileSync(path.resolve(__dirname, config.output), result)
} catch (e) {
  fs.mkdirSync(path.dirname(config.output))
  fs.writeFileSync(path.resolve(__dirname, config.output), result)
}
