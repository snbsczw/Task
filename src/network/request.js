import axios from 'axios'

export function request(config, success, failure) {
  const instance = axios.create({
    baseURL: '/data',
    timeout: 5000
  });
  //axios拦截器
  //请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config;
  }, error => {
    // console.log(error);
  })
  //响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data;
  }, error => {
    // console.log(error);
  });
  return instance(config)
}