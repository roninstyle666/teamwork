import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
const baseURL = "";
class HttpRequest {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;

  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      
    };
    return config;
  }
  interception(instance: AxiosInstance) {
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
    config.headers['token'] =localStorage.getItem('token')
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      return response;
    }, function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }
  

  request(options: AxiosRequestConfig) {

    options = { ...this.getInsideConfig(), ...options };
    const instance = axios.create();
    this.interception(instance);
    return instance(options);
  }


}
export default new HttpRequest(baseURL);