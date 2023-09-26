/*
 * @Author: kime
 * @Date: 2023-09-22 13:47:41
 * @LastEditors: kime
 * @LastEditTime: 2023-09-25 17:07:15
 * @Description: 容器最基本的样式
 */
import { View, Text } from '@tarojs/components'
import Skeleton from '@/components/skeleton'

interface SkeletonProps {
    className?: string
}

export default function NewSkeleton (props: SkeletonProps) {

    return (
        <View className={props.className?"skeleton-box "+props.className:'skeleton-box'}>
            <Skeleton />
        </View>
    )
}
