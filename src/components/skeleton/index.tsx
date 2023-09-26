/*
 * @Author: kime
 * @Date: 2023-09-20 15:41:10
 * @LastEditors: kime
 * @LastEditTime: 2023-09-26 16:47:51
 * @Description: 
 */
import React from 'react';
import { View, Text } from '@tarojs/components'
import { SkeletonProps } from "./index.types";
import "./index.scss";

const DEFAULT_ROW_WIDTH = '100%';
const DEFAULT_DESIGN_WIDTH = 750

export default function Skeleton (props: SkeletonProps) {
    if (!props.loading) {
        return <View>{props.children}</View>
    }


    const getRowWidth = (index: number) => {

        if (props.rowProps) {
            if (Array.isArray(props.rowProps)) {
                return props.rowProps[index].width
            }
            return props.rowProps.width
        }

        if (props.rowWidth === DEFAULT_ROW_WIDTH) {
            return DEFAULT_ROW_WIDTH
        }
        if (Array.isArray(props.rowWidth)) {
            return props.rowWidth[index]
        }
        return props.rowWidth
    }

    const getRowHeight = (index: number) => {
        if (props.rowProps) {
            if (Array.isArray(props.rowProps)) {
                return props.rowProps[index].height
            }
            return props.rowProps.height
        }

        if (Array.isArray(props.rowHeight)) {
            return props.rowHeight[index]
        }
        return props.rowHeight
    }

    const addUnit = (value?: string | number) => {
        return typeof value === 'number' ? value + "px" : value
    }

    const renderAvatar = (): JSX.Element | null => {
        if (props.avatar) {
            const avatarClass = props.avatarShape === 'round' ? 'skeleton-avatar-round' : 'skeleton-avatar';
            return <View className={avatarClass} style={` width: ${addUnit(props.avatarSize)};height: ${addUnit(props.avatarSize)} `} />
        }
        return null
    }


    const renderTitle = (): JSX.Element | null => {
        if (props.title) {
            return <View className='skeleton-title' style={`width: ${addUnit(props.titleWidth)};`}></View>
        }
        return null
    }
    const renderAction = (): JSX.Element | null => {
        if (props.action && props.type !== 'column') {
            return <View className='skeleton-action' />
        }
        return null
    }
    const renderRows = (): JSX.Element | null => {
        if (props.row) {
            const rowArray = Array.apply(null, Array(props.row)).map((_, index) => index)
            const Rows = rowArray.map((item, index) => {
                return <View key={item} className='skeleton-row' style={`width: ${addUnit(getRowWidth(index))};height: ${addUnit(getRowHeight(index))}`} />
            })
            return <View className='skeleton-rows'>{Rows}</View>
        }
        return null
    }

    let rootClass = props.type ? `"keleton-type-${props.type}` : "";
    if (props.animate && props.animateName === 'blink') {
        rootClass += "skeleton-animate-blink ";
    }

    if (props.animate && props.animateName === 'elastic') {
        rootClass += "skeleton-animate-elastic ";
    }



    return (
        <View className={"skeleton " + rootClass}>
            {renderAvatar()}
            <View className='skeleton-content' style={{ textAlign: props.contentAlignStyle }}>
                {renderTitle()}
                {renderRows()}
            </View>
            {renderAction()}
        </View>
    )
}

Skeleton.options = {
    addGlobalClass: true
}
Skeleton.defaultProps = {
    avatarSize: 90,
    type: 'row',
    row: 0,
    loading: true,
    animate: true,
    rowWidth: DEFAULT_ROW_WIDTH,
    rowHeight: 24,
    titleWidth: '40%',
    avatarShape: 'round',
    animateName: 'blink',
    contentAlignStyle: 'center',
    designWidth: DEFAULT_DESIGN_WIDTH
}
