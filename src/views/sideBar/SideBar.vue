<template>
  <div class="side-bar">
    <div class="top">账单管理</div>
    <div>
      <div ref="billButton"
           v-for="(item, index) in names"
           :key="index"
           @click="getData(item)"
           class="bill-button">
        {{item}}
      </div>
    </div>
    <div class="add-button" @click="OpenAddBillDialog">
      <img src="image/Add.png" alt="">
    </div>
    <set-bill-name :is-visible="dialogFormVisible"
                   @cancel="cancelSet"
                   @submitName="setName"></set-bill-name>
  </div>
</template>

<script>
  import SetBillName from './SetBillName';
  export default {
    name: "SideBar",
    props: {
      names: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    components: {
      SetBillName
    },
    data() {
      return {
        activeItemName: 'initBill',
        dialogFormVisible: false,
      }
    },
    methods: {
     // 点击账单名称时，获取账单的数据
      getData(item){
        this.saveCurrent(this.activeItemName);
        this.activeItemName = item;
        this.$emit('getData', item);
      },
      //保存当前的账单数据
      saveCurrent(itemName){
        this.$emit('saveCurrent', itemName);
      },
      //打开添加账单表单
      OpenAddBillDialog(){
        this.dialogFormVisible = true;
      },
      //取消添加
      cancelSet(){
        this.dialogFormVisible = false;
      },
      //为账单设置名字
      setName(newItemName){
        this.$emit('addNewBill', newItemName);
        this.dialogFormVisible = false;
        this.activeItemName = newItemName;
      }
    }
  }
</script>

<style scoped>
  .top {
    width: 100%;
    height: 90px;
    background-color: #eee;
    text-align: center;
    line-height: 90px;
    font-size: 20px;
  }


  .side-bar {
    height: 100%;
    background-color: #fff;
  }

  .add-button {
    cursor: pointer;
    background-color: #eee;
    width: 100%;
    height: 90px;
    position: relative;
  }


  .add-button img {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 80px;
    height: 80px;
  }
  .bill-button {

    cursor: pointer;
    display: inline-block;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    width: 100%;
    height: 90px;
    text-align: center;
    line-height: 90px;
  }

  .bill-button:visited {
    background-color: #f00;
    pointer-events:none
  }
  .bill-button:hover {
    background-color: #ECF5FF;
    color: #409EFF;

  }
</style>