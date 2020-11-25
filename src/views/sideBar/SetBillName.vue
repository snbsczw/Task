<template>
  <el-dialog title="为新建账单命名" :visible.sync="isVisible"
             :before-close="cancel" @submit.native.prevent>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
      <el-form-item label="账单名称: " label-width="120px" prop="name" >
        <el-input v-model="ruleForm.name" placeholder="请输入账单名称" autofocus="autofocus"></el-input>
      </el-form-item>
      <div  class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
  import {checkName} from "@/js/AddDataFormCheck";
  export default {
    name: "SetBillName",
    props: ['isVisible'],
    data(){
      return{
        ruleForm: {
          name: '',
        },
        rules: {
          name: {validator: checkName, trigger: 'blur'}
        }
      }
    },
    methods: {
      cancel(){
        this.$emit('cancel');
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.$emit('submitName', this.ruleForm.name);
          }else{
            console.log('error submit');
            return false;
          }
        });
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>