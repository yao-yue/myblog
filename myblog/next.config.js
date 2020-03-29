//解决css引入问题
const withCss = require('@zeit/next-css')
if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}
module.exports = withCss({})