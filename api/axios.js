import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 30000, // 增加超时时间，因为检测可能需要较长时间
  withCredentials: false
})

// 请求拦截器 - 调试用
api.interceptors.request.use(
  config => {
    console.log(`🚀 发送请求: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    
    // 如果是文件上传，不设置Content-Type，让浏览器自动设置
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }
    
    return config
  },
  error => {
    console.error('❌ 请求配置错误:', error)
    ElMessage.error('请求配置错误')
    return Promise.reject(error)
  }
)

// 响应拦截器 - 调试用
api.interceptors.response.use(
  response => {
    console.log(`✅ 请求成功: ${response.status}`)
    return response
  },
  error => {
    console.error('❌ 请求失败:', error)
    
    if (error.response) {
      // 服务器返回了错误状态码
      console.error('❌ 错误状态码:', error.response.status)
      console.error('❌ 错误数据:', error.response.data)
      
      const message = error.response.data?.error || error.response.data?.message || '请求失败'
      ElMessage.error(`服务器错误: ${message}`)
    } else if (error.request) {
      // 请求发送了但没有收到响应
      console.error('❌ 无响应:', error.request)
      ElMessage.error('网络错误：无法连接到服务器，请检查后端服务是否启动')
    } else {
      // 其他错误
      console.error('❌ 其他错误:', error.message)
      ElMessage.error(`请求错误: ${error.message}`)
    }
    
    return Promise.reject(error)
  }
)

export default api