<!--
 * @Author: kime
 * @Date: 2023-09-18 15:44:33
 * @LastEditors: kime
 * @LastEditTime: 2023-09-24 17:19:10
 * @Description: 
-->
# taro-skeleton-screen
# 一个基于taro-skeleton做了webpack5 、Taro3.6以上版本的兼容处理

### 支持多端平台使用 
1. 微信小程序
2. h5
3. 百度小程序
4. 头条小程序
5. 支付宝小程序


### 使用方式

#### 导入组件
``` javascript
import Skeleton from 'taro-skeleton-screen'
```

#### 导入样式
* 全局引入（JS中）
``` js
import 'taro-skeleton-screen/dist/index.css' // 引入组件样式
```

### 基础用法

通过`title`属性显示标题占位图，通过`row`属性配置占位段落行数

``` html
<Skeleton title row={3} />
```

``` html
<Skeleton
  title
  avatar
  row={3}
  loading={loading}
>
  <Text>实际内容</Text>
</Skeleton>
```


```tsx
export default class Index extends Component {
  state = {
    loading: false
  }
  render () {
    return (
      <View className='index'>
        <Skeleton loading={this.state.loading} title avatar row={2} action></Skeleton>
      </View>
    )
  }
}
```

