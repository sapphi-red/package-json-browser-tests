# Tests for the `browser` field in `package.json`

Most JavaScript bundlers support a special bundler-specific field in `package.json` called `browser`. The idea is that this field lets you override certain import paths for node-specific code with browser-specific alternatives.

There is a "specification" for this field here: https://github.com/defunctzombie/package-browser-field-spec. However, the specification is abandoned, doesn't actually specify much, and comes without any tests. As a result, bundles implement this feature inconsistently leading to this feature breaking often in different situations.

This repository is a collection of some tests for this feature. The tests are not necessarily comprehensive. But they are better than nothing.

## Positive Results

These tests are expected to pass. Each test is considered successful if the bundle is generated without errors and if the resulting bundle runs the code `input.works = true`.

<table>
<tr><th>Test</th><th>esbuild</th><th>webpack</th><th>vite</th><th>browserify</th><th>rollup</th><th>parcel</th></tr>
<tr><td><pre>entry.js:
  require('foo')
package.json:
  { "browser": { "./foo": "./file" } }
file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>🚫</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('foo')
package.json:
  { "browser": { "foo": "./file" } }
file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('./foo')
package.json:
  { "browser": { "./foo": "./file" } }
file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('./foo')
package.json:
  { "browser": { "foo": "./file" } }
file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/foo/bar')
node_modules/pkg/package.json:
  { "browser": { "./foo/bar": "./file" } }
node_modules/pkg/foo/bar.js:
  invalid syntax
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/foo/bar')
node_modules/pkg/package.json:
  { "browser": { "foo/bar": "./file" } }
node_modules/pkg/foo/bar.js:
  invalid syntax
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/foo/bar')
node_modules/pkg/package.json:
  { "browser": { "./foo/bar": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/foo/bar')
node_modules/pkg/package.json:
  { "browser": { "foo/bar": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/index.js:
  require('foo/bar')
node_modules/pkg/package.json:
  { "browser": { "./foo/bar": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>🚫</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/index.js:
  require('foo/bar')
node_modules/pkg/package.json:
  { "browser": { "foo/bar": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/index.js:
  throw 'fail'
node_modules/pkg/package.json:
  { "browser": { "./index.js": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/package.json:
  { "browser": { "./index.js": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/index.js:
  throw 'fail'
node_modules/pkg/package.json:
  { "browser": { "./index": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/package.json:
  { "browser": { "./index": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/main.js:
  throw 'fail'
node_modules/pkg/package.json:
  { "main": "./main",
    "browser": { "./main.js": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/package.json:
  { "main": "./main",
    "browser": { "./main.js": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
package.json:
  { "browser": { "pkg2": "pkg3" } }
node_modules/pkg/index.js:
  require('pkg2')
node_modules/pkg/package.json:
  { "browser": { "pkg2": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
package.json:
  { "browser": { "pkg2": "pkg3" } }
node_modules/pkg/index.js:
  require('pkg2')
node_modules/pkg2/index.js:
  throw 'fail'
node_modules/pkg3/index.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
package.json:
  { "browser": { "pkg2": "pkg3" } }
node_modules/pkg/index.js:
  require('pkg2')
node_modules/pkg/package.json:
  { "browser": { "./pkg2": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>🚫</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/dir')
node_modules/pkg/package.json:
  { "browser": { "./dir/index": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/dir')
node_modules/pkg/package.json:
  { "browser": { "./dir/index.js": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>🚫</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/dir')
node_modules/pkg/package.json:
  { "browser": { "./dir/index": "./file" } }
node_modules/pkg/dir/index.js:
  input.works = true
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/dir')
node_modules/pkg/package.json:
  { "browser": { "./dir/index.js": "./file" } }
node_modules/pkg/dir/index.js:
  input.works = true
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/package.json:
  { "main": "main.js", "browser": { "./dir/index.js": "./file" } }
node_modules/pkg/main.js:
  require('./dir')
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>🚫</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
package.json:
  { "browser": { "./index.js": "./fail.js" } }
fail.js:
  throw 'fail'
node_modules/pkg/main.js:
  require('./lib')
node_modules/pkg/package.json:
  { "main": "main.js" }
node_modules/pkg/lib/index.js:
  input.works = true
node_modules/pkg/lib/fail.js:
  throw 'fail'
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/package.json:
  { "browser": { "./foo/bar.js": "./foo/baz" } }
node_modules/pkg/index.js:
  require('./foo/bar')
node_modules/pkg/foo/baz.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/sub')
node_modules/pkg/package.json:
  { "browser": { "./sub": "./sub/foo.js" } }
node_modules/pkg/sub/foo.js:
  require('sub')
node_modules/sub/package.json:
  { "main": "./bar" }
node_modules/sub/bar.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/sub')
node_modules/pkg/package.json:
  { "browser": {
    "./sub": "./sub/foo.js",
    "./sub/sub": "./sub/bar.js"
  } }
node_modules/pkg/sub/foo.js:
  require('sub')
node_modules/pkg/sub/bar.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/sub')
node_modules/pkg/package.json:
  { "browser": {
    "./sub": "./sub/foo.js",
    "./sub/sub.js": "./sub/bar.js"
  } }
node_modules/pkg/sub/foo.js:
  require('sub')
node_modules/sub/index.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/index.js:
  require("./sub/foo")
node_modules/pkg/sub/bar.js:
  require("baz")
node_modules/pkg/package.json:
  { "browser": {
    "./sub/foo": "./sub/bar.js",
    "./sub/baz": "./sub/bat.js"
  } }
node_modules/pkg/sub/bat.js:
  input.works = true
node_modules/baz/index.js:
  invalid syntax
</pre></td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/index.js:
  require("./sub/foo")
node_modules/pkg/sub/bar.js:
  require("baz")
node_modules/pkg/package.json:
  { "browser": {
    "./sub/foo.js": "./sub/bar.js",
    "./sub/baz.js": "./sub/bat.js"
  } }
node_modules/pkg/sub/bat.js:
  invalid syntax
node_modules/baz/index.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
<td>🚫</td>
</tr>
<tr><td>Percent handled:</td>
<td>100.0%</td>
<td>74.2%</td>
<td>71.0%</td>
<td>54.8%</td>
<td>19.4%</td>
<td>NaN%</td>
</tr>
</table>

## Negative Results

These tests are expected to fail. Each test is considered a failure if the bundle is generated without errors and if the resulting bundle runs the code `input.works = true`.

<table>
<tr><th>Test</th><th>esbuild</th><th>webpack</th><th>vite</th><th>browserify</th><th>rollup</th><th>parcel</th></tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/package.json:
  { "browser": { ".": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>🚫</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr><td><pre>entry.js:
  require('./foo.js')
package.json:
  { "browser": { "foo": "./file" } }
index.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/foo.js')
node_modules/pkg/package.json:
  { "browser": { "foo": "./file" } }
node_modules/pkg/index.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr><td><pre>entry.js:
  require('./foo.js')
package.json:
  { "browser": { "./foo": "./file" } }
index.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg/foo.js')
node_modules/pkg/package.json:
  { "browser": { "./foo": "./file" } }
node_modules/pkg/index.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/main.js:
  throw 'fail'
node_modules/pkg/package.json:
  { "main": "./main.js",
    "browser": { "./main": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/package.json:
  { "main": "./main.js",
    "browser": { "./main": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
package.json:
  { "browser": { "pkg2": "pkg3" } }
node_modules/pkg/index.js:
  require('pkg2')
node_modules/pkg/package.json:
  { "browser": {} }
node_modules/pkg2/index.js:
  throw 'fail'
node_modules/pkg3/index.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr><td><pre>entry.js:
  require('pkg')
package.json:
  { "browser": { "./pkg2": "pkg3" } }
node_modules/pkg/index.js:
  require('pkg2')
node_modules/pkg2/index.js:
  throw 'fail'
node_modules/pkg3/index.js:
  input.works = true
</pre></td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr><td>Percent handled:</td>
<td>100.0%</td>
<td>100.0%</td>
<td>88.9%</td>
<td>100.0%</td>
<td>100.0%</td>
<td>100.0%</td>
</tr>
</table>

