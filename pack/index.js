const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core')

/**
 * 根据文件路径生成 ast
 * @param {path} filename 
 */
function generaterAst (content) {
  const ast = babylon.parse(content, {
    sourceType: 'module'
  })
  return ast
}

/**
 * 根据 ast 获取依赖
 * @param { Object } ast 
 */
function getDependencies (ast) {
  let dependencies = []
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value)
    }
  })
  return dependencies
}

/**
 * 根据 ast 转换成 es5 代码
 * @param {*} ast 
 */
function transformToCode (ast) {
  const { code } = transformFromAst(ast, null, { presets: ['env'] })
  return code
}

/**
 * 生成模块描述信息, 包括模块文件名, 依赖, 源码字符串
 * @param {*} fileName 
 */
function parse(fileName) {
  const content = fs.readFileSync(fileName, 'utf-8')
  
  const ast = generaterAst(content)
  return {
    fileName,
    dependencies: getDependencies(ast),
    code: transformToCode(ast)
  };
}

/**
 * 从入口文件开始将所有依赖放入graph数组中
 * @param {*} entry 
 */
function initGraph (entry) {
  const main = parse(entry)
  const graph = [main]
  graph.forEach(node => {
    const dirname = path.dirname(main.fileName)
    node.dependencies.forEach( dep => {
      let absolutePath = path.join(dirname, dep)
      absolutePath = absolutePath.indexOf('.js') === -1 ? absolutePath + '.js' : absolutePath
  
      let child = parse(absolutePath)
      graph.push(child)
    })
  })
  return graph
}

function bundle(queue) {
  let modules = ''
  queue.forEach(function (mod) {
    modules += `'${mod.fileName}': function (require, module, exports) { ${mod.code} },`
  })
  const result = 
  `(function(modules) {
    function require(fileName) {
      const fn = modules[fileName];
      const module = { exports : {} };
      fn(require, module, module.exports);
      return module.exports;
    }
    require('${config.entry}');
  })({${modules}})
  `;
  return result;
}

function pack (option) {
  config = option
  const graph = initGraph(option.entry)
  const bundleResult = bundle(graph)
  return bundleResult
}
let config = {}

module.exports = pack
