<template>
  <div>
    <el-container class="container">
      <el-aside class="el-aside">
        <side-bar :names="Object.keys(allData)"
                  @saveCurrent="saveCurrent"
                  @getData="getData"
                  @addNewBill="addNewBill"></side-bar>
      </el-aside>
      <el-main class="el-main">
        <div class="app-index">
          <div class="buttons">
            <el-button @click="OpenAddDataDialog">添加数据</el-button>
            <el-button @click="clearFilter">重置所有过滤器</el-button>
          </div>
          <div class="content">
            <el-table :data="bill" height="800px" stripe  ref="dataList"
                      @filter-change="handleFilterChange" class="el-table">
              <el-table-column prop="category" label="项目"
                               sortable
                               :filters="cateFilters"
                               :filter-method="CateFilter"
                               column-key="cateFilter">
              </el-table-column>
              <el-table-column prop="type" label="类别">
                <template slot-scope="scope">{{scope.row.type === '1' ? '收入' : '支出'}}</template>
              </el-table-column>
              <el-table-column prop="amount" label="金额">
                <template slot-scope="scope">{{scope.row.amount | getAmount}}</template>
              </el-table-column>
              <el-table-column prop="time" label="时间"
                               sortable
                               :filters="monthFilters"
                               :filter-method="MonthFilter"
                               column-key="monthFilter">
                <template slot-scope="scope">{{scope.row.time | getTime}}</template>
              </el-table-column>
            </el-table>
            <div class="data-bar">
              <div class="in-out-card" id="inOutCard">
                <in-out-bar :bill="bill" :data-list="dataList"></in-out-bar>
              </div>
              <div class="cate-card" id="cateCard">
                <cate-bar  :bill="bill" :data-list="dataList"></cate-bar>
              </div>
            </div>
            <add-data :is-visible="dialogFormVisible"
                      @cancel="cancelAdd"
                      @submitData="addData(arguments)">
            </add-data>
          </div>

        </div>

      </el-main>
    </el-container>


  </div>


</template>

<script>
  import {getBillCsv,getCategoriesCsv} from "../network/getdata";
  import InOutBar from "./barChart/InOutBar";
  import CateBar from "./barChart/CateBar";
  import {Bar} from '@antv/g2plot';
  import SideBar from './sideBar/SideBar'
  import AddData from './dialog/AddData'
  export default {
    name: "AppIndex",
    components: {
      InOutBar,
      CateBar,
      SideBar,
      AddData,
    },
    data(){
      return{
        allData: {               //保存所有账单数据
          initBill: this.bill,
        },
        bill: [],
        cate: [],
        dataList: [],
        currentCateList: [], //保存过滤后的数据 用来传递给条形图显示
        currentMonthList: [],

        isCateFilter: false, //用来表示这两个过滤器是否是过滤状态
        isMonthFilter: false,
        cateFilters:[], // 类别筛选选项数组
        monthFilters: [
          {
            text: '一月',
            value: 1
          },
          {
            text: '二月',
            value: 2
          },
          {
            text: '三月',
            value: 3
          },
          {
            text: '四月',
            value: 4
          },
          {
            text: '五月',
            value: 5
          },
          {
            text: '六月',
            value: 6
          },
          {
            text: '七月',
            value: 7
          },
          {
            text: '八月',
            value: 8
          },
          {
            text: '九月',
            value: 9
          },
          {
            text: '十月',
            value: 10
          },
          {
            text: '十一月',
            value: 11
          },
          {
            text: '十二月',
            value: 12
          },
        ], //月份筛选选项数组

        dialogFormVisible: false,//控制添加数据的表单状态
      }
    },
    methods: {
      /*
      添加账单相关函数
       */
      //当打开一个新的账单时，要先把当前展示的账单数据保存
      saveCurrent(name){
        this.allData[name] = this.bill;
        this.bill = [];
      },
      //打开一个新账单时，根据账单名字获取数据 同时更新过滤器选项数组
      getData(item){
        this.bill = this.allData[item];
        this.getCateFilters();
      },
      //添加一个新账单并打开，需要将当前账单保存
      addNewBill(name){
        // console.log(Object.keys(this.allData));
        // console.log(Object.keys(this.allData).length);
        let pass = true;
        for(let key in this.allData){
          if(key === name){
            this.$message.error('账单名字重复');
            pass =false;
            break;
          }
        }
        if(pass){
          this.allData[Object.keys(this.allData)[Object.keys(this.allData).length - 1]] = this.bill;
          this.allData[name] = [];
          this.bill = [];
          this.getCateFilters();
        }
      },
      /*
      添加数据相关函数
      */
      //打开添加数据的表单
      OpenAddDataDialog(){
        this.dialogFormVisible = true;
      },
      //取消添加数据
      cancelAdd(){
        this.dialogFormVisible = false;
      },
      //添加数据
      addData(msg){
        this.bill.push({category: msg[0],type: msg[1], amount: msg[2], time: msg[3]});
        this.getCateFilters();
        this.dialogFormVisible = false;
      },

      /*
      当数据发生变化时，需要重新获取category过滤器的选项数组
       */
      getCateFilters(){
        this.cateFilters = [];
        let cateFiltersSet = new Set();//利用Set的去重特性
        this.bill.forEach(cn => {
          cateFiltersSet.add(cn.category);
        });
        cateFiltersSet.forEach(cn => {
          this.cateFilters.push({text: cn, value: cn});
        })
      },
      /*
      category过滤函数
       */
      CateFilter(value, row){
        if(row.category === value){
          this.isCateFilter = true;
          this.currentCateList.push(row);
          return true;
        }
        return false;
      },
      /*
      月份过滤函数
       */
      MonthFilter(value, row){
        let date = new Date(row.time * 1 + 8 * 3600 * 1000) //时区转换
        if(date.getMonth() + 1 === value){//getMonth默认是0~11的,需+1
          this.isMonthFilter = true;
          this.currentMonthList.push(row)
          return true;
        }
        return false;
      },
      /*
      重置所有过滤器
       */
      clearFilter() {
        this.$refs.dataList.clearFilter();
        this.handleFilterChange();
      },
      /*
      当过滤器发生变化时， dataList要改变，用来更新条形图
       */
      handleFilterChange(){
        this.dataList = [];
        if(this.isCateFilter && this.isMonthFilter){
          this.currentCateList.forEach(ca => {
            for(let i of this.currentMonthList){
              if(i === ca){
                this.dataList.push(i);
                break;
              }
            }
          })
        }else if(this.isCateFilter && !this.isMonthFilter){
          this.dataList = this.currentCateList;
        }else if(!this.isCateFilter && this.isMonthFilter){
          this.dataList = this.currentMonthList;
        }else{
          this.dataList = this.bill;
        }
        this.currentCateList = [];
        this.currentMonthList = [];
        this.isMonthFilter = false;
        this.isCateFilter = false;
      },
    },
    created(){
      const d3 = require('d3-dsv');
      getBillCsv().then(res => {
        let ret = d3.csvParse(res);
        this.bill = ret;
      });
      getCategoriesCsv().then(res => {
        let ret = d3.csvParse(res);
        this.cate = ret;
        this.bill.forEach(cn => {
          this.dataList.push({category: '', time: cn.time, amount: cn.amount, type: cn.type});
          this.cate.forEach(e => {
            if(cn.category === e.id){
              this.dataList[this.dataList.length - 1].category = e.name;
            }
          })
        });
        //把bill中的name换成category中对应的文字
        this.cate.forEach(cn => {
          this.bill.forEach(e => {
            if(cn.id === e.category){
              e.category = cn.name;
            }
          });
        });
        this.getCateFilters();//获取category过滤选项数组
        // console.log(this.dataList);
      })
    },
    filters: {
      getAmount(amount){
        return '￥' + parseFloat(amount).toFixed(2);
      },
      getTime(time){
        let date = new Date(time * 1 + 8 * 3600 * 1000);//时区转换
        return date.toISOString().substring(0,19)
      }
    },
  }
</script>

<style scoped>
  .container {
    display: flex;
  }

  .el-aside {
    flex: 1;
    /*width: 320px;*/
    background-color: #F1F4F5;
    padding: 10px 0;
  }
  .el-main {
    flex: 5;
    background-color: #F1F4F5;
    padding: 10px 20px;
  }
  .app-index {
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
  .app-index .buttons {
    flex: 1;
    margin: 20px 40px 0;
  }
  .app-index .content {
    flex: 7;
    margin: 20px 40px;
    display: flex;
  }
  .content .el-table {
    /*width: 800px;*/
    flex: 4;
    margin: 0;
    background-color: #fff;
    display: inline-block;
    float: left;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .content .data-bar {
    flex: 2;
    height: 800px;
    /*width: 400px;*/
    margin-left: 50px;
    background-color: #fff;
    display: inline-block;
    float: left;
    padding: 0 20px ;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }

</style>