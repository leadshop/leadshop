/*
 * @Author: qinuoyun
 * @Date:   2020-11-23 16:45:10
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-03-17 11:45:51
 */
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin') //最新版本copy-webpack-plugin插件暂不兼容，推荐v5.0.0

let externals = process.env.UNI_PLATFORM === 'h5' ? { 'siteInfo': 'siteInfo' } : { 'siteInfo': 'commonjs2 ../siteinfo.js'};
let copy = process.env.UNI_PLATFORM !== 'h5' ? [{from: path.join(__dirname, 'src/siteinfo.js'), to: 'siteinfo.js'}] : [];
copy.push.apply(copy, [{from: path.join(__dirname, 'we7'), to: 'we7', toType: "dir"}]);

module.exports = {
    css: {
        loaderOptions: {
            // 给 less-loader 传递 Less.js 相关选项
            less: {
            }
        }
    },
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [
                //这个是加上自己的路径，
                //注意：试过不能使用别名路径
                path.resolve(__dirname, "./src/packages/common/style/theme.less")
            ]
        }

    },
    configureWebpack: {
        externals: externals,
        plugins: [
            new CopyWebpackPlugin({
                patterns: copy,
            }),
        ],
    },
    chainWebpack: (config) => {
        // // 发行或运行时启用了压缩时会生效
        // config.optimization.minimizer('terser').tap((args) => {
        //     const compress = args[0].terserOptions.compress;
        //     // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
        //     compress.drop_console = true;
        //     compress.pure_funcs = [
        //         '__f__', // App 平台 vue 移除日志代码
        //         // 'console.debug' // 可移除指定的 console 方法
        //     ];
        //     return args;
        // });
    }
}
