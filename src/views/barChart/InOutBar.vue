<template>
    <div id="InOutBar" ref="InOutBar">
    </div>
</template>

<script>
  import {Bar} from '@antv/g2plot';
  export default {
    name: "InOutBar",
    data(){
      return{
        isFirst: true,
        inSum: 0,
        outSum: 0,
      }
    },
    props: {
      bill: {
        type: Array,
        default(){
          return [];
        }
      },
      dataList: {
        type: Array,
        default() {
          return [];
        }
      },
    },
    watch: {
      bill(){
        this.inSum = this.outSum = 0;
        const _t = this;
        /**
         * 计算收入支出和
         */
        this.bill.forEach(cn => {
          if(cn.type === '1'){
            this.inSum += parseFloat(cn.amount);
          }else {
            this.outSum += parseFloat(cn.amount);
          }
        });
        const data = [
          {类型: '收入', 金额: this.inSum},
          {类型: '支出', 金额: this.outSum},
        ];
        if(this.isFirst){
          this.isFirst = !this.isFirst;
          // this.$refs.InOutBar.id
          _t.barPlot = new Bar(this.$refs.InOutBar.id, {
            data,
            xField: '金额',
            yField: '类型',
            colorField:'类型',
            color:['#fe7874','#b27ee9'],
            style: {
              fontSize: 14,
              fill: 'grey'
            }
          });
          _t.barPlot.render();
        }else{
          _t.barPlot.changeData(data);
        }
      },
      dataList(){
        this.inSum = this.outSum = 0;
        const _t = this;
        this.dataList.forEach(cn => {
          if(cn.type === '1'){
            this.inSum += parseFloat(cn.amount);
          }else {
            this.outSum += parseFloat(cn.amount);
          }
        });
        const data = [
          {类型: '收入', 金额: this.inSum},
          {类型: '支出', 金额: this.outSum},
        ];
        _t.barPlot.changeData(data);
      }
    }
  }
</script>

<style scoped>
  #InOutBar {
    width: 100%;
    height: 400px;
  }
</style>