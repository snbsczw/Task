<template>
  <div id="cateBar">
  </div>
</template>

<script>
  import {Bar} from '@antv/g2plot';
  import {sortBy} from '@/js/sort.js';
  export default {
    name: "CateBar",
    data(){
      return{
        isFirst: true,
        cateDate: this.dataList
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
      bill: {
        // immediate:true,
        handler:function(){
          // console.log(this.bill);
          const _t = this;
          let data = [];
          let obj = {};
          this.bill.forEach(cn => {
            cn.category in obj ? (obj[cn.category] += cn.amount * 1) : ((obj[cn.category] = cn.amount * 1))
          });
          for(let i in obj){
            data.push({'类型': i, '金额': obj[i]})
          }
          // console.log(data);
          data.sort(sortBy('金额'));
          if(this.isFirst){
            this.isFirst = !this.isFirst;
            _t.barPlot = new Bar(document.getElementById('cateBar'), {
              data,
              xField: '金额',
              yField: '类型',
              colorField:'类型',
              color:['#fe9b6e','#fe7874','#5ddad2','#b27ee9','#69c0ff','#83a5fe','#ffc069','#96de64'],
              style: {
                fontSize: 14,
                fill: 'grey'
              }
            });
            _t.barPlot.render();
          }else{
            _t.barPlot.changeData(data);
          }
        }

      },
      dataList(){
        const _t = this;
        let data = [];
        let obj = {};
        this.dataList.forEach(cn => {
          cn.category in obj ? (obj[cn.category] += cn.amount * 1) : ((obj[cn.category] = cn.amount * 1))
        });
        for(let i in obj){
          data.push({'类型': i, '金额': obj[i]})
        }
        data.sort(sortBy('金额'));
        _t.barPlot.changeData(data);
      }
    },
  }
</script>

<style scoped>
  #cateBar {
    width: 100%;
    height: 400px;
  }
</style>