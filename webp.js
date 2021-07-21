// Never could get this to work. https://css-tricks.com/using-webp-images/

// Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: D:\Code\WDD-330\node_modules\imagemin\index.js
// require() of ES modules is not supported.
// require() of D:\Code\WDD-330\node_modules\imagemin\index.js from D:\Code\WDD-330\webp.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope 
// as ES modules.
// Instead rename index.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from D:\Code\WDD-330\node_modules\imagemin\package.json.

const imagemin = require('imagemin'),
  webp = require('imagemin-webp')
const outputFolder = './images/webp'
const produceWebP = async () => {
  await imagemin(['./challenge/assets/*.png'], {
    destination: outputFolder,
    plugins: [
      webp({
        lossless: true
      })
    ]
  })
  console.log('PNGs processed')
  await imagemin(['images/*.{jpg,jpeg}'], {
    destination: outputFolder,
    plugins: [
      webp({
        quality: 65
      })
    ]
  })
  console.log('JPGs and JPEGs processed')
}
produceWebP()