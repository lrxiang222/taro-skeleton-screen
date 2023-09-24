/*
 * @Author: kime
 * @Date: 2023-09-20 16:00:26
 * @LastEditors: kime
 * @LastEditTime: 2023-09-24 17:42:28
 * @Description: 
 */
import RollupJson from '@rollup/plugin-json';
import RollupNodeResolve from "@rollup/plugin-node-resolve";
import RollupCommonjs from "@rollup/plugin-commonjs";
import RollupCopy from "rollup-plugin-copy";
import RollupScss from "rollup-plugin-scss";
import RollupTypescript from '@rollup/plugin-typescript';
import { resolve, dirname } from 'path';
import Package from '../package.json' assert { type: 'json' };

const __dirname = dirname("node:path");
const externalPackages = [
    'react',
    'react-dom',
    '@tarojs/components',
    '@tarojs/runtime',
    '@tarojs/taro',
    '@tarojs/react'
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
            sourcemap: true
        },
        {
            file: resolveFile(Package.module),
            format: 'es',
            sourcemap: true
        },
        {
            file: resolveFile(Package.browser),
            format: 'umd',
            name: 'taro-skeleton',
            sourcemap: true,
            globals: {
                react: 'React',
                '@tarojs/components': 'components',
                '@tarojs/taro': 'Taro'
            }
        }
    ],
    external: externalPackages,
    plugins: [
        RollupJson(),
        RollupScss({
            include: ["/**/*.css", "/**/*.scss", "/**/*.sass"],
            output: 'style.css',
            failOnError: true,
        }),
        RollupNodeResolve(),
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