let checkAmount = (rule, value, callback) => {
  if(!value){
    return callback(new Error('金额不能为空'));
  }else{
    let reg = /^[0-9]+$/;
    if(value !== "" && !reg.test(value)){
      return callback(new Error('只能输入数字'))
    }
    if(value === '0'){
      return  callback(new Error('金额不能为0'))
    }
    callback();
  }
};
let checkEmpty = (rule, value, callback) => {
  if(!value){
    return callback(new Error('此项不能为空'));
  }
  callback();
};

let checkName = (rule, value, callback) => {
  if(!value){
    return callback(new Error('此项不能为空'));
  }
  let reg = /^[a-zA-Z]+$/;
  if(value !== "" && !reg.test(value)){
    return callback(new Error('只能输入英文'));
  }
  callback();
};

export {
  checkAmount,
  checkEmpty,
  checkName
}