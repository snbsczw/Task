# mymind

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

```
操作系统：Windows 运行环境：Chrome浏览器
功能概述：页面左侧是账单管理侧边栏，点击加号可以添加新的账单，添加时需要给新的账单命名，命名规则为只能为字母组合的字符串且不能重复。点击相应的账单名称，统计图和表格会展示对应的数据。
        页面中间是展示账单数据的表格，点击上侧的添加数据可以为该账单添加一条新的数据， 添加规则为:"category只能为字母组合的字符串，amount只能为数字，四项都必选"重置所有过滤器按钮可以将表格中的过滤器全部重置。表格中项目和时间一栏都有排序器和过滤器、排序同时只能有一个生效，过滤器可以同时生效两个以实现二次筛选。
        页面右侧为收入支出条形图和分类金额条形图，这两张图会根据表格中的数据实时更新并自动按照金额从小到大排序。
思考过程：首先对于该项目的数据我选择使用ds-dsv和axios将提供的csv文件转换为json数据。
           为了更直观的展示数据，我选择同时使用表格和条形统计图，其中统计图有两个，一个是当前表格中展示数据的总收入以及总支出的收入支出图和根据表格中category列分类的金额统计图，收入以正数表示，支出以负数表示。同时在统计图中加入排序功能，按照从低到高排序。
        当由于添加数据或者更改筛选条件而导致表格内发生数据变化时，统计图中的数据会根据表格内的数据变化自动重绘。
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
