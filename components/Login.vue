<template>
  <div class="login-container">
    <el-card class="login-card" header="智慧农业病害检测系统">
      <el-form @submit.prevent="handleLogin">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading" style="width: 100%">
          登录
        </el-button>
        <div style="margin-top: 10px; color: #666; text-align: center">
          演示账号: admin / admin123
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import api from '../api/axios'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      try {
        const response = await api.post('/login', this.form)
        if (response.data.success) {
          this.$message.success('登录成功')
          this.$router.push('/detect')
        } else {
          this.$message.error(response.data.message)
        }
      } catch (error) {
        this.$message.error('登录失败')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.login-card {
  width: 400px;
}
</style>