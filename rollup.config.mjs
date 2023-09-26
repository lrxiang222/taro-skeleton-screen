/*
 * @Author: kime
 * @Date: 2023-09-20 16:00:26
 * @LastEditors: kime
 * @LastEditTime: 2023-09-26 17:13:17
 * @Description: 
 */
import cleaner from "rollup-plugin-cleaner";
import RollupJson from '@rollup/plugin-json';
import RollupNodeResolve from "@rollup/plugin-node-resolve";
import RollupCommonjs from "@rollup/plugin-commonjs";
import RollupCopy from "rollup-plugin-copy";
import RollupScss from "rollup-plugin-scss";
import RollupTypescript from '@rollup/plugin-typescript';
import { resolve, dirname } from 'path'; 
import Package from './package.json' assert { type: 'json' }; 

const __dirname = dirname("node:path");
const externalPackages = [
    'react',
    'react-dom',
    '@tarojs/components',
    '@tarojs/runtime',
    '@tarojs/taro',
    '@tarojs/react',
    '/\.css$/'
]
const resolveFile = pathobj => {
    let newObj = resolve(__dirname, ".", pathobj)
    // console.log("pathobj", newObj, Package);
    return newObj
};
 

export default {
    input: resolveFile(Package.source),
    output: [
        {
            file: resolveFile(Package.main),
            format: 'cjs',
            name: "index",
            assetFileNames: "style/taroskeleton.css",
            sourcemap: true,
        },
        {
            file: resolveFile(Package.module),
            format: 'es',
            name: "index",
            assetFileNames: "style/taroskeleton.css",
            sourcemap: true,
        },
        {
            file: resolveFile(Package.browser),
            format: 'umd',
            sourcemap: true,
            name: "index",
            assetFileNames: "style/taroskeleton.css",
            globals: {
                react: 'React',
                '@tarojs/components': 'components',
                '@tarojs/taro': 'Taro'
            },
        }
    ],
    external: externalPackages,
    plugins: [
        cleaner({
            targets: [
                './dist/'
            ]
        }),
        RollupScss({
            failOnError:true
        }),
        RollupJson(),
        RollupNodeResolve({
            jsnext: true, // Default: false
            main: true,
            browser: true // Default: false
        }),
        RollupCommonjs({
            include: /\/node_modules\//
        }),
        RollupTypescript({
            tsconfig: resolveFile('tsconfig.rollup.json')
        }),
        RollupCopy({
            targets: [
                {
                    src: resolveFile('src/style'),
                    dest: resolveFile('dist')
                }
            ]
        })
    ]
}