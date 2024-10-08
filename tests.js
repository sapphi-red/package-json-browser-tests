const positiveTests = [
  {
    'entry.js': `require('foo')`,
    'package.json': `{ "browser": { "./foo": "./file" } }`,
    'file.js': `input.works = true`,
  },
  {
    'entry.js': `require('foo')`,
    'package.json': `{ "browser": { "foo": "./file" } }`,
    'file.js': `input.works = true`,
  },
  {
    'entry.js': `require('./foo')`,
    'package.json': `{ "browser": { "./foo": "./file" } }`,
    'file.js': `input.works = true`,
  },
  {
    'entry.js': `require('./foo')`,
    'package.json': `{ "browser": { "foo": "./file" } }`,
    'file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/foo/bar')`,
    'node_modules/pkg/package.json': `{ "browser": { "./foo/bar": "./file" } }`,
    'node_modules/pkg/foo/bar.js': `invalid syntax`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/foo/bar')`,
    'node_modules/pkg/package.json': `{ "browser": { "foo/bar": "./file" } }`,
    'node_modules/pkg/foo/bar.js': `invalid syntax`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/foo/bar')`,
    'node_modules/pkg/package.json': `{ "browser": { "./foo/bar": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/foo/bar')`,
    'node_modules/pkg/package.json': `{ "browser": { "foo/bar": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/index.js': `require('foo/bar')`,
    'node_modules/pkg/package.json': `{ "browser": { "./foo/bar": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/index.js': `require('foo/bar')`,
    'node_modules/pkg/package.json': `{ "browser": { "foo/bar": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/index.js': `throw 'fail'`,
    'node_modules/pkg/package.json': `{ "browser": { "./index.js": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/package.json': `{ "browser": { "./index.js": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/index.js': `throw 'fail'`,
    'node_modules/pkg/package.json': `{ "browser": { "./index": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/package.json': `{ "browser": { "./index": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/main.js': `throw 'fail'`,
    'node_modules/pkg/package.json': `{ "main": "./main",\n  "browser": { "./main.js": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/package.json': `{ "main": "./main",\n  "browser": { "./main.js": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'package.json': `{ "browser": { "pkg2": "pkg3" } }`,
    'node_modules/pkg/index.js': `require('pkg2')`,
    'node_modules/pkg/package.json': `{ "browser": { "pkg2": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'package.json': `{ "browser": { "pkg2": "pkg3" } }`,
    'node_modules/pkg/index.js': `require('pkg2')`,
    'node_modules/pkg2/index.js': `throw 'fail'`,
    'node_modules/pkg3/index.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'package.json': `{ "browser": { "pkg2": "pkg3" } }`,
    'node_modules/pkg/index.js': `require('pkg2')`,
    'node_modules/pkg/package.json': `{ "browser": { "./pkg2": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/dir')`,
    'node_modules/pkg/package.json': `{ "browser": { "./dir/index": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/dir')`,
    'node_modules/pkg/package.json': `{ "browser": { "./dir/index.js": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/dir')`,
    'node_modules/pkg/package.json': `{ "browser": { "./dir/index": "./file" } }`,
    'node_modules/pkg/dir/index.js': `input.works = true`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/dir')`,
    'node_modules/pkg/package.json': `{ "browser": { "./dir/index.js": "./file" } }`,
    'node_modules/pkg/dir/index.js': `input.works = true`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/package.json': `{ "main": "main.js", "browser": { "./dir/index.js": "./file" } }`,
    'node_modules/pkg/main.js': `require('./dir')`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'package.json': `{ "browser": { "./index.js": "./fail.js" } }`,
    'fail.js': `throw 'fail'`,
    'node_modules/pkg/main.js': `require('./lib')`,
    'node_modules/pkg/package.json': `{ "main": "main.js" }`,
    'node_modules/pkg/lib/index.js': `input.works = true`,
    'node_modules/pkg/lib/fail.js': `throw 'fail'`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/package.json': `{ "browser": { "./foo/bar.js": "./foo/baz" } }`,
    'node_modules/pkg/index.js': `require('./foo/bar')`,
    'node_modules/pkg/foo/baz.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/sub')`,
    'node_modules/pkg/package.json': `{ "browser": { "./sub": "./sub/foo.js" } }`,
    'node_modules/pkg/sub/foo.js': `require('sub')`,
    'node_modules/sub/package.json': `{ "main": "./bar" }`,
    'node_modules/sub/bar.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/sub')`,
    'node_modules/pkg/package.json': `{ "browser": {
  "./sub": "./sub/foo.js",
  "./sub/sub": "./sub/bar.js"
} }`,
    'node_modules/pkg/sub/foo.js': `require('sub')`,
    'node_modules/pkg/sub/bar.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/sub')`,
    'node_modules/pkg/package.json': `{ "browser": {
  "./sub": "./sub/foo.js",
  "./sub/sub.js": "./sub/bar.js"
} }`,
    'node_modules/pkg/sub/foo.js': `require('sub')`,
    'node_modules/sub/index.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/index.js': 'require("./sub/foo")',
    'node_modules/pkg/sub/bar.js': 'require("baz")',
    'node_modules/pkg/package.json': `{ "browser": {
  "./sub/foo": "./sub/bar.js",
  "./sub/baz": "./sub/bat.js"
} }`,
    'node_modules/pkg/sub/bat.js': `input.works = true`,
    'node_modules/baz/index.js': `invalid syntax`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/index.js': 'require("./sub/foo")',
    'node_modules/pkg/sub/bar.js': 'require("baz")',
    'node_modules/pkg/package.json': `{ "browser": {
  "./sub/foo.js": "./sub/bar.js",
  "./sub/baz.js": "./sub/bat.js"
} }`,
    'node_modules/pkg/sub/bat.js': `invalid syntax`,
    'node_modules/baz/index.js': `input.works = true`,
  },
]

const negativeTests = [
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/package.json': `{ "browser": { ".": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('./foo.js')`,
    'package.json': `{ "browser": { "foo": "./file" } }`,
    'index.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/foo.js')`,
    'node_modules/pkg/package.json': `{ "browser": { "foo": "./file" } }`,
    'node_modules/pkg/index.js': `input.works = true`,
  },
  {
    'entry.js': `require('./foo.js')`,
    'package.json': `{ "browser": { "./foo": "./file" } }`,
    'index.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/foo.js')`,
    'node_modules/pkg/package.json': `{ "browser": { "./foo": "./file" } }`,
    'node_modules/pkg/index.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/main.js': `throw 'fail'`,
    'node_modules/pkg/package.json': `{ "main": "./main.js",\n  "browser": { "./main": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/package.json': `{ "main": "./main.js",\n  "browser": { "./main": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'package.json': `{ "browser": { "pkg2": "pkg3" } }`,
    'node_modules/pkg/index.js': `require('pkg2')`,
    'node_modules/pkg/package.json': `{ "browser": {} }`,
    'node_modules/pkg2/index.js': `throw 'fail'`,
    'node_modules/pkg3/index.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'package.json': `{ "browser": { "./pkg2": "pkg3" } }`,
    'node_modules/pkg/index.js': `require('pkg2')`,
    'node_modules/pkg2/index.js': `throw 'fail'`,
    'node_modules/pkg3/index.js': `input.works = true`,
  },
]

const fs = require('fs')
const path = require('path')
const browserify = require('browserify')
const webpack = require('webpack')
const esbuild = require('esbuild')
const parcel = require('@parcel/core')
const rollup = require('rollup')
const pluginNodeResolve = require('@rollup/plugin-node-resolve')
const pluginCommonJS = require('@rollup/plugin-commonjs')
const vite = require('vite')
const inDir = path.join(__dirname, 'in')
const outDir = path.join(__dirname, 'out')
const parcelCacheDir = path.join(__dirname, '.parcel-cache')

const bundlers = {
  browserify() {
    return new Promise(resolve => {
      browserify(path.join(inDir, 'entry.js')).bundle((err, out) => {
        if (!err) {
          try {
            const input = {}
            new Function('input', out)(input)
            if (!input.works) throw new Error('Expected "works"')
          } catch (e) {
            err = e
          }
        }
        resolve(err)
      })
    })
  },

  webpack() {
    return new Promise(resolve => webpack({
      entry: path.join(inDir, 'entry.js'),
      output: {
        path: outDir,
        filename: 'result.js',
      },
    }, (err, stats) => {
      if (!err && stats.hasErrors()) err = stats.toJson().errors[0]
      if (!err) {
        try {
          const input = {}
          new Function('input', fs.readFileSync(path.join(outDir, 'result.js')))(input)
          if (!input.works) throw new Error('Expected "works"')
        } catch (e) {
          err = e
        }
      }
      resolve(err)
    }))
  },

  async esbuild() {
    let err
    try {
      const result = await esbuild.build({
        entryPoints: [path.join(inDir, 'entry.js')],
        bundle: true,
        write: false,
        logLevel: 'silent',
      })
      const input = {}
      new Function('input', result.outputFiles[0].text)(input)
      if (!input.works) throw new Error('Expected "works"')
    } catch (e) {
      if (e && e.errors && e.errors[0]) e = new Error(e.errors[0].text)
      err = e
    }
    return err
  },

  async parcel() {
    let err
    try {
      // Prevent parcel from messing with the console
      require('@parcel/logger').patchConsole = () => 0
      require('@parcel/logger').unpatchConsole = () => 0
      await new parcel.default({
        entries: path.join(inDir, 'entry.js'),
        defaultConfig: require.resolve('@parcel/config-default'),
        defaultTargetOptions: {
          distDir: outDir,
        },
      }).run()
      const input = {}
      const globalObj = {} // Prevent parcel from messing with the global object
      new Function('input', 'globalThis', 'self', 'window', 'global',
        fs.readFileSync(path.join(outDir, 'entry.js'), 'utf8'))(
          input, globalObj, globalObj, globalObj, globalObj)
      if (!input.works) throw new Error('Expected "works"')
    } catch (e) {
      err = e
    }
    return err
  },

  async rollup() {
    let err
    try {
      const bundle = await rollup.rollup({
        input: path.join(inDir, 'entry.js'),
        onwarn: x => { throw new Error(x) },
        plugins: [
          pluginNodeResolve.default({
            browser: true,
          }),
          pluginCommonJS(),
        ],
      })
      const { output } = await bundle.generate({
        format: 'iife',
        name: 'name',
      })
      const input = {}
      new Function('input', output[0].code)(input)
      if (!input.works) throw new Error('Expected "works"')
    } catch (e) {
      err = e
    }
    return err
  },

  async vite() {
    let err
    try {
      const { output } = await vite.build({
        build: {
          rollupOptions: {
            input: path.join(inDir, 'entry.js'),
            onwarn: x => { throw new Error(x) },
            output: {
              format: 'iife',
              name: 'name',
            },
          },
          commonjsOptions: {
            include: [/./]
          },
          write: false,
        },
        logLevel: 'silent',
      })
      const input = {}
      new Function('input', output[0].code)(input)
      if (!input.works) throw new Error('Expected "works"')
    } catch (e) {
      err = e
    }
    return err
  }
}

function reset() {
  fs.rmSync(inDir, { recursive: true, force: true })
  fs.rmSync(outDir, { recursive: true, force: true })
  // comment out as it errors with EBUSY
  // fs.rmSync(parcelCacheDir, { recursive: true, force: true, maxRetries: 10 })
}

function setup(test) {
  fs.mkdirSync(inDir, { recursive: true })

  for (const file in test) {
    const absFile = path.join(inDir, file)
    fs.mkdirSync(path.dirname(absFile), { recursive: true })
    fs.writeFileSync(absFile, test[file])
  }
}

async function run() {
  let positiveCounter = 0
  const positiveResults = []
  for (const test of positiveTests) {
    console.log(`Positive test ${positiveCounter++}`)
    reset()
    setup(test)
    const result = { test }

    for (const bundler in bundlers) {
      const err = await bundlers[bundler]()
      console.log(`  ${bundler}: ${err ? `🚫 ${err && err.message || err}`.split('\n')[0] : '✅'}`)
      result[bundler] = !err
    }

    positiveResults.push(result)
  }

  let negativeCounter = 0
  const negativeResults = []
  for (const test of negativeTests) {
    console.log(`Negative test ${negativeCounter++}`)
    reset()
    setup(test)
    const result = { test }

    for (const bundler in bundlers) {
      const err = await bundlers[bundler]()
      console.log(`  ${bundler}: ${err ? `✅` : '🚫 Unexpected success'}`)
      result[bundler] = !!err
    }

    negativeResults.push(result)
  }

  reset()

  const sortedBundlers = Object.keys(bundlers).map(bundler => {
    let count = 0
    for (const result of positiveResults)
      if (result[bundler])
        count++
    return { bundler, count }
  }).sort((a, b) => b.count - a.count).map(({ bundler }) => bundler)

  const printTable = results => {
    text += `<table>\n`
    text += `<tr><th>Test</th>`
    for (const bundler of sortedBundlers) {
      text += `<th>${bundler}</th>`
    }
    text += `</tr>\n`
    const counts = {}
    for (const result of results) {
      text += `<tr><td><pre>`
      for (const file in result.test) {
        text += `${file}:\n  ${result.test[file].replace(/\n/g, '\n  ')}\n`
      }
      text += `</pre></td>\n`
      for (const bundler of sortedBundlers) {
        text += `<td>${result[bundler] ? '✅' : '🚫'}</td>\n`
        if (result[bundler]) counts[bundler] = (counts[bundler] | 0) + 1
      }
      text += `</tr>\n`
    }
    text += `<tr><td>Percent handled:</td>\n`
    for (const bundler of sortedBundlers) {
      text += `<td>${(counts[bundler] / results.length * 100).toFixed(1)}%</td>\n`
    }
    text += `</tr>\n`
    text += `</table>\n\n`
  }

  const readmePath = path.join(__dirname, 'README.md')
  const readmeText = fs.readFileSync(readmePath, 'utf8')
  const index = readmeText.indexOf('## Positive Results')
  let text = readmeText.slice(0, index)

  text += `## Positive Results\n\n`
  text += `These tests are expected to pass. Each test is considered successful ` +
    `if the bundle is generated without errors and if the resulting bundle runs ` +
    `the code \`input.works = true\`.\n\n`
  printTable(positiveResults)

  text += `## Negative Results\n\n`
  text += `These tests are expected to fail. Each test is considered a failure ` +
    `if the bundle is generated without errors and if the resulting bundle runs ` +
    `the code \`input.works = true\`.\n\n`
  printTable(negativeResults)

  fs.writeFileSync(readmePath, text)

  const width = Math.max(...Object.keys(bundlers).map(x => x.length))
  const progress = fraction => {
    const total = 64
    const pos = Math.floor(fraction * total)
    return '█'.repeat(pos) + '-'.repeat(total - pos) + ' ' + (fraction * 100).toFixed(1) + '%'
  }

  console.log(`Positive results:`)
  for (const bundler of sortedBundlers) {
    let count = 0
    for (const result of positiveResults)
      if (result[bundler])
        count++
    console.log(`  ${(bundler + ':').padEnd(width + 1)} ${progress(count / positiveResults.length)}`)
  }

  console.log(`Negative results:`)
  for (const bundler of sortedBundlers) {
    let count = 0
    for (const result of negativeResults)
      if (result[bundler])
        count++
    console.log(`  ${(bundler + ':').padEnd(width + 1)} ${progress(count / negativeResults.length)}`)
  }
}

run()
