/*
 * @Author: kime
 * @Date: 2023-09-22 13:47:41
 * @LastEditors: kime
 * @LastEditTime: 2023-09-24 11:08:22
 * @Description: 容器最基本的样式
 */
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

interface SkeletonProps {
    className?: string
}

export default function NewSkeleton (props: SkeletonProps) {

    return (
        <View className={props.className?"skeleton-box "+props.className:'skeleton-box'}>
            <Text>Hello woasdfkjaskdjf rld!</Text>
        </View>
    )
}
