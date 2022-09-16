import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import pkg from '../package.json'

import OLLData from '../src/data/OLLCubes'
import PLLData from '../src/data/PLLCubes'


const buildId = `rubics-algo-${pkg.version}`

const deepFiles = (dir: string): string[] => {
  const dirPath = path.resolve(dir)
  const files = fs.readdirSync(dirPath)
  return files.map(file => {
    const filePath = path.join(dirPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      return deepFiles(path.join(dir, file)).map(f => path.join(file, f))
    }
    return file
  }).flat()
}


const defaultAlgorithms = (type: 'oll' | 'pll', data: Record<string, Record<string, unknown>>) => {
  return Object.entries(data).map(([section, d]) => {
    return Object.keys(d).map(name => {
      return [
        `_next/data/${buildId}/${type}/${encodeURIComponent(section)}/${encodeURIComponent(name)}.json?section=${section.replace(/ /g, '+')}&name=${name.replace(/ /g, '+')}`,
        `${type}/${encodeURIComponent(section)}/${encodeURIComponent(name)}`
      ]
    })
  }).flat(2)
}

const compiler = webpack({
  mode: 'production',
  entry: './scripts/template.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            noEmit: false
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'sw.js',
    path: path.resolve('public')
  },
  plugins: [
    new webpack.DefinePlugin({
      __next_generated__: JSON.stringify(deepFiles('.next/static').map(file => path.join('_next', 'static', file).replace(/\\/g, '/'))),
      __next_pages__: JSON.stringify(['/', '/oll', '/pll']),
      __next_data__: JSON.stringify([...defaultAlgorithms('oll', OLLData), ...defaultAlgorithms('pll', PLLData)]),
      __public_files__: JSON.stringify(deepFiles('public').filter(file => !file.endsWith('sw.js')).map(file => file.replace(/\\/g, '/'))),
      id: JSON.stringify('test')
    })
  ]
}, (err, stats) => {
  console.log(stats?.compilation?.errors)
  compiler.close(console.error)
})