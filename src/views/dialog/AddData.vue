<template>
  <el-dialog title="添加数据" :visible.sync="isVisible" :before-close="cancel" @submit.native.prevent>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon >
      <el-form-item label="category" label-width="120px" prop="category">
        <el-input v-model="ruleForm.category" aria-placeholder="请输入category" autofocus="autofocus"></el-input>
      </el-form-item>
      <el-form-item label="type" label-width="120px" prop="type">
        <el-radio v-model="ruleForm.type" label="1">收入</el-radio>
        <el-radio v-model="ruleForm.type" label="0">支出</el-radio>
      </el-form-item>
      <el-form-item label="amount" label-width="120px" prop="amount">
        <el-input v-model="ruleForm.amount" aria-placeholder="请输入amount"></el-input>
      </el-form-item>
      <el-form-item label="time" label-width="120px" prop="time">
         <el-date-picker v-model="ruleForm.time" type="datetime" placeholder="请选择time"></el-date-picker>
      </el-form-item>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary"  @click="submitForm('ruleForm')" id="enter">确定</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
  import {checkAmount,checkEmpty} from "@/js/AddDataFormCheck";

  export default {
    name: "AddData",
    props: ['isVisible'],
    data(){
      return{
        ruleForm: {
          category: '',
          amount: '',
          type: '',
          time: ''
        },
        rules: {
          category: {validator: checkEmpty, trigger: 'blur'},
          // type: {validator: checkEmpty, trigger: 'blur'},
          amount: { validator: checkAmount, trigger: 'blur'},
          time: {validator: checkEmpty, trigger: 'blur'},
        }
      }
    },
    methods: {
      cancel(){
        this.$refs.ruleForm.resetFields();
        this.$emit('cancel');
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) =>{
          if(valid){
            this.ruleForm.time = this.ruleForm.time.getTime();
            this.$emit('submitData', this.ruleForm.category,this.ruleForm.type,this.ruleForm.amount,this.ruleForm.time);
            this.$refs[formName].resetFields();
          }else{
            this.$message({
              message: '请填写所有内容后再提交',
              type: 'warning'
            });
            return false;
          }
        });

      }
    }
  }
</script>

<style scoped>
  #enter {

  }
</style>