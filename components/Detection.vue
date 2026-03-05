<template>
  <div class="dashboard">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <i class="fas fa-seedling"></i>
          <h2>青禾智造</h2>
        </div>
      </div>
      
      <ul class="sidebar-menu">
        <li><a href="#" :class="{active: currentPage === 'dashboard'}" @click="changePage('dashboard')"><i class="fas fa-tachometer-alt"></i><span>仪表板</span></a></li>
        <li><a href="#" :class="{active: currentPage === 'monitoring'}" @click="changePage('monitoring')"><i class="fas fa-desktop"></i><span>田间监控</span></a></li>
        <li><a href="#" :class="{active: currentPage === 'analysis'}" @click="changePage('analysis')"><i class="fas fa-chart-line"></i><span>AI分析</span></a></li>
        <li><a href="#" :class="{active: currentPage === 'decisions'}" @click="changePage('decisions')"><i class="fas fa-cogs"></i><span>智能决策</span></a></li>
        <li><a href="#" :class="{active: currentPage === 'records'}" @click="changePage('records')"><i class="fas fa-clipboard-list"></i><span>农事记录</span></a></li>
        <li><a href="#" :class="{active: currentPage === 'market'}" @click="changePage('market')"><i class="fas fa-shopping-cart"></i><span>产销对接</span></a></li>
        <li><a href="#" :class="{active: currentPage === 'profile'}" @click="changePage('profile')"><i class="fas fa-user"></i><span>我的资料</span></a></li>
      </ul>
      
      <div class="sidebar-footer">
        <p>广东建设职业技术学院</p>
        <p>建筑信息学院</p>
      </div>
    </aside>
    
    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 顶部导航栏 -->
      <div class="top-nav">
        <div class="page-title">
          <h1>农户智能管理平台</h1>
          <p>AI驱动的精准农业决策系统</p>
        </div>
        
        <div class="user-info">
          <div class="user-avatar">张</div>
          <div class="user-details">
            <div class="user-name">张愉萍</div>
            <div class="user-role">农户</div>
          </div>
          <button class="btn btn-secondary logout-btn" @click="logout">退出登录</button>
        </div>
      </div>
      
      <!-- 仪表板页面 -->
      <div id="dashboard-page" class="page-content" v-show="currentPage === 'dashboard'">
        <div class="row">
          <div class="col-3">
            <div class="card metric-card">
              <div class="card-body">
                <i class="fas fa-tint fa-2x" style="color: #2196F3;"></i>
                <div class="metric-value">85%</div>
                <div class="metric-label">土壤湿度</div>
              </div>
            </div>
          </div>
          
          <div class="col-3">
            <div class="card metric-card">
              <div class="card-body">
                <i class="fas fa-thermometer-half fa-2x" style="color: #F44336;"></i>
                <div class="metric-value">24°C</div>
                <div class="metric-label">环境温度</div>
              </div>
            </div>
          </div>
          
          <div class="col-3">
            <div class="card metric-card">
              <div class="card-body">
                <i class="fas fa-leaf fa-2x" style="color: #4CAF50;"></i>
                <div class="metric-value">92%</div>
                <div class="metric-label">作物健康度</div>
              </div>
            </div>
          </div>
          
          <div class="col-3">
            <div class="card metric-card">
              <div class="card-body">
                <i class="fas fa-sun fa-2x" style="color: #FF9800;"></i>
                <div class="metric-value">1250</div>
                <div class="metric-label">光照强度(lux)</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-6">
            <div class="card">
              <div class="card-header">
                <h3>环境数据监测</h3>
                <span class="status status-success">实时更新</span>
              </div>
              <div class="card-body">
                <div class="chart-container">
                  <canvas id="envChart"></canvas>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-6">
            <div class="card">
              <div class="card-header">
                <h3>作物生长预测</h3>
                <span class="status status-warning">AI分析中</span>
              </div>
              <div class="card-body">
                <div class="chart-container">
                  <canvas id="growthChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3>AI决策建议</h3>
                <span class="status status-success">最新建议</span>
              </div>
              <div class="card-body">
                <div class="alert alert-success">
                  <i class="fas fa-check-circle"></i>
                  <strong>推荐操作：</strong> 根据当前土壤湿度(85%)和天气预报，建议在明天上午进行灌溉，预计用水量15m³/亩。
                </div>
                
                <div class="alert alert-warning">
                  <i class="fas fa-exclamation-triangle"></i>
                  <strong>病虫害预警：</strong> AI检测到轻微叶斑病迹象，建议使用推荐农药预防，用量为50ml/亩。
                </div>
                
                <div class="alert alert-info">
                  <i class="fas fa-info-circle"></i>
                  <strong>施肥建议：</strong> 根据土壤养分分析，建议在3天后追施氮肥，用量为8kg/亩。
                </div>
                
                <div class="alert alert-success">
                  <i class="fas fa-calendar-alt"></i>
                  <strong>采收预测：</strong> 根据生长模型预测，最佳采收时间为15天后，预计亩产可达1200kg。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 田间监控页面 -->
      <div id="monitoring-page" class="page-content" v-show="currentPage === 'monitoring'">
        <div class="card">
          <div class="card-header">
            <h3>田间实时监控</h3>
            <button class="btn btn-primary"><i class="fas fa-sync-alt"></i> 刷新数据</button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <h4>物联网传感器数据</h4>
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>传感器</th>
                      <th>数值</th>
                      <th>状态</th>
                      <th>更新时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><i class="fas fa-tint"></i> 土壤湿度传感器1</td>
                      <td>85%</td>
                      <td><span class="status status-success">正常</span></td>
                      <td>10:25:32</td>
                    </tr>
                    <tr>
                      <td><i class="fas fa-thermometer-half"></i> 温度传感器1</td>
                      <td>24°C</td>
                      <td><span class="status status-success">正常</span></td>
                      <td>10:25:30</td>
                    </tr>
                    <tr>
                      <td><i class="fas fa-sun"></i> 光照传感器1</td>
                      <td>1250 lux</td>
                      <td><span class="status status-success">正常</span></td>
                      <td>10:25:35</td>
                    </tr>
                    <tr>
                      <td><i class="fas fa-flask"></i> 土壤EC传感器1</td>
                      <td>2.1 mS/cm</td>
                      <td><span class="status status-warning">偏高</span></td>
                      <td>10:25:28</td>
                    </tr>
                    <tr>
                      <td><i class="fas fa-vial"></i> 土壤pH传感器1</td>
                      <td>6.8</td>
                      <td><span class="status status-success">正常</span></td>
                      <td>10:25:33</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div class="col-6">
                <h4>设备状态</h4>
                <div class="device-grid">
                  <div class="device-card">
                    <div class="device-icon">
                      <i class="fas fa-water fa-2x"></i>
                    </div>
                    <div class="device-info">
                      <div class="device-name">智能灌溉系统</div>
                      <div class="device-status status-success">在线</div>
                      <div class="device-action">
                        <button class="btn btn-sm btn-primary">远程控制</button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="device-card">
                    <div class="device-icon">
                      <i class="fas fa-camera fa-2x"></i>
                    </div>
                    <div class="device-info">
                      <div class="device-name">田间摄像头</div>
                      <div class="device-status status-success">在线</div>
                      <div class="device-action">
                        <button class="btn btn-sm btn-primary">查看画面</button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="device-card">
                    <div class="device-icon">
                      <i class="fas fa-wifi fa-2x"></i>
                    </div>
                    <div class="device-info">
                      <div class="device-name">网关设备</div>
                      <div class="device-status status-success">在线</div>
                      <div class="device-action">
                        <button class="btn btn-sm btn-primary">查看详情</button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="device-card">
                    <div class="device-icon">
                      <i class="fas fa-robot fa-2x"></i>
                    </div>
                    <div class="device-info">
                      <div class="device-name">无人机</div>
                      <div class="device-status status-warning">充电中</div>
                      <div class="device-action">
                        <button class="btn btn-sm btn-secondary">预约任务</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h4 class="mt-4">实时视频监控</h4>
                <div class="video-placeholder">
                  <div class="video-frame">
                    <div class="video-overlay">
                      <i class="fas fa-video fa-3x"></i>
                      <p>田间实时监控画面</p>
                      <p class="small-text">（您可以将监控视频URL放置在此）</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- AI分析页面 - 病害检测功能 -->
      <div id="analysis-page" class="page-content" v-show="currentPage === 'analysis'">
        <div class="card">
          <div class="card-header">
            <h3>AI病虫害识别</h3>
            <div class="header-actions">
              <el-button @click="checkBackendStatus" type="info" size="small">
                检查后端状态
              </el-button>
              <el-button @click="showConfigDialog = true" type="primary" size="small">
                检测配置
              </el-button>
            </div>
          </div>
          <div class="card-body">
            <!-- 后端状态提示 -->
            <div v-if="modelStatus" class="status-alert" :class="modelLoaded ? 'alert-success' : 'alert-warning'">
              <i class="fas" :class="modelLoaded ? 'fa-check-circle' : 'fa-exclamation-triangle'"></i>
              {{ modelStatus }}
            </div>
            
            <div class="row">
              <div class="col-6">
                <h4>上传作物图片进行AI识别</h4>
                <div class="upload-area" @click="triggerFileInput" :class="{'has-image': originalImage}">
                  <i class="fas fa-cloud-upload-alt fa-3x"></i>
                  <p v-if="!originalImage">拖放或点击上传作物图片</p>
                  <p v-if="originalImage">已选择: {{ uploadFile?.name || '图片' }}</p>
                  <input type="file" id="cropImage" accept="image/*" @change="handleImageUpload" style="display: none;">
                  <button class="btn btn-primary mt-3" @click.stop="triggerFileInput">选择图片</button>
                </div>
                
                <!-- 开始检测按钮 -->
                <button 
                  class="btn btn-success mt-3 w-100" 
                  @click="detectDisease" 
                  :disabled="!uploadFile || detecting"
                  :class="{'loading': detecting}">
                  <i class="fas" :class="detecting ? 'fa-spinner fa-spin' : 'fa-search'"></i>
                  {{ detecting ? '检测中...' : '开始检测' }}
                </button>
                
                <!-- 检测结果 -->
                <div class="mt-4">
                  <h5>检测结果</h5>
                  <div v-if="results.length > 0" class="detection-results">
                    <div v-for="(item, index) in results" :key="index" class="result-item">
                      <div class="disease-tag" :class="getSeverityClass(item.confidence)">
                        {{ getDiseaseName(item.class) }}
                      </div>
                      <div class="confidence-value">
                        置信度: {{ (item.confidence * 100).toFixed(1) }}%
                      </div>
                    </div>
                    <div v-if="responseData?.model_used" class="model-info">
                      <i class="fas fa-check-circle"></i> 使用真实AI模型检测
                    </div>
                  </div>
                  <div v-else class="placeholder-text">
                    {{ detecting ? '检测中...' : '暂无检测结果' }}
                  </div>
                </div>
                
                <div class="mt-4">
                  <h5>近期识别记录</h5>
                  <table class="data-table">
                    <thead>
                      <tr>
                        <th>日期</th>
                        <th>识别结果</th>
                        <th>置信度</th>
                        <th>处理建议</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2025-12-10</td>
                        <td>叶斑病（早期）</td>
                        <td>92%</td>
                        <td>已处理</td>
                      </tr>
                      <tr>
                        <td>2025-12-05</td>
                        <td>蚜虫侵扰</td>
                        <td>88%</td>
                        <td>已处理</td>
                      </tr>
                      <tr>
                        <td>2025-12-01</td>
                        <td>白粉病</td>
                        <td>95%</td>
                        <td>已处理</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div class="col-6">
                <h4>AI识别结果</h4>
                <div class="analysis-result">
                  <div class="result-header">
                    <div class="disease-name">{{ currentDisease || '等待检测' }}</div>
                    <div v-if="currentConfidence" class="confidence">
                      置信度: {{ (currentConfidence * 100).toFixed(1) }}%
                    </div>
                  </div>
                  
                  <!-- 图片预览区域 -->
                  <div class="result-image">
                    <div v-if="originalImage" class="image-container">
                      <div class="image-placeholder">
                        <img :src="originalImage" alt="原图" class="preview-img">
                        <div class="image-label">原图</div>
                      </div>
                    </div>
                    <div v-if="resultImage" class="image-container">
                      <div class="image-placeholder">
                        <img :src="resultImage" alt="检测结果" class="preview-img">
                        <div class="image-label">检测结果</div>
                      </div>
                    </div>
                    <div v-if="!originalImage" class="image-placeholder empty">
                      <i class="fas fa-leaf fa-4x"></i>
                      <p>请上传作物图片进行AI识别</p>
                    </div>
                  </div>
                  
                  <!-- 病害详情和建议 -->
                  <div class="result-details" v-if="advice.length > 0">
                    <div v-for="(item, index) in advice" :key="index">
                      <h5>病害说明</h5>
                      <p>{{ getDiseaseDescription(item.disease) }}</p>
                      
                      <h5 class="mt-3">症状</h5>
                      <ul>
                        <li v-for="(symptom, idx) in item.symptoms" :key="idx">{{ symptom }}</li>
                      </ul>
                      
                      <h5 class="mt-3">AI处理建议</h5>
                      <ul>
                        <li v-for="(solution, idx) in item.solutions" :key="idx">{{ solution }}</li>
                      </ul>
                      
                      <h5 class="mt-3">预防措施</h5>
                      <ul>
                        <li v-for="(prevent, idx) in item.prevention" :key="idx">{{ prevent }}</li>
                      </ul>
                      
                      <h5 class="mt-3">严重程度</h5>
                      <div class="severity-indicator" :class="'severity-' + item.severity">
                        {{ getSeverityText(item.severity) }}
                      </div>
                    </div>
                  </div>
                  <div v-else class="result-details placeholder">
                    <p>检测后将显示详细的病害信息和防治建议</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 其他页面保持不变... -->
      <div id="decisions-page" class="page-content" v-show="currentPage === 'decisions'">
        <!-- 智能决策页面内容 -->
      </div>
      
      <div id="records-page" class="page-content" v-show="currentPage === 'records'">
        <!-- 农事记录页面内容 -->
      </div>
      
      <div id="market-page" class="page-content" v-show="currentPage === 'market'">
        <!-- 产销对接页面内容 -->
      </div>
      
      <div id="profile-page" class="page-content" v-show="currentPage === 'profile'">
        <!-- 我的资料页面内容 -->
      </div>
    </main>
    
    <!-- 配置对话框 -->
    <el-dialog v-model="showConfigDialog" title="检测配置" width="500px">
      <el-form :model="detectionConfig" label-width="120px">
        <el-form-item label="置信度阈值">
          <el-slider 
            v-model="detectionConfig.confidence_threshold"
            :min="0.1"
            :max="0.9"
            :step="0.05"
            show-input>
          </el-slider>
          <div class="config-tip">值越高，检测要求越严格</div>
        </el-form-item>
        
        <el-form-item label="最大检测数量">
          <el-input-number 
            v-model="detectionConfig.max_detections"
            :min="1"
            :max="10">
          </el-input-number>
        </el-form-item>
        
        <el-form-item label="检测模式">
          <el-radio-group v-model="detectionMode">
            <el-radio label="accurate">精确模式</el-radio>
            <el-radio label="balanced">平衡模式</el-radio>
            <el-radio label="sensitive">敏感模式</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="showConfigDialog = false">取消</el-button>
        <el-button type="primary" @click="updateDetectionConfig">应用配置</el-button>
        <el-button @click="resetDetectionConfig">恢复默认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

// 病害名称映射
const diseaseNames = {
  'rice_blast': '稻瘟病',
  'powdery_mildew': '白粉病',
  'leaf_spot': '叶斑病',
  'rust_disease': '锈病',
  'healthy': '健康'
};

// 病害描述
const diseaseDescriptions = {
  '稻瘟病': '稻瘟病是由稻瘟病菌引起的水稻重要病害，主要危害叶片、茎秆和穗部。',
  '白粉病': '白粉病是由白粉菌引起的真菌病害，常见于多种作物，叶片表面出现白色粉状霉层。',
  '叶斑病': '叶斑病是由多种病原菌引起的叶部病害，叶片上出现不同形状和颜色的斑点。',
  '锈病': '锈病是由锈菌引起的真菌病害，叶片上出现铁锈色粉状孢子堆。',
  '健康': '作物生长正常，无明显病害症状。'
};

export default {
  name: 'FarmerDashboard',
  data() {
    return {
      currentPage: 'dashboard',
      
      // 病害检测相关数据
      originalImage: null,
      resultImage: null,
      detecting: false,
      results: [],
      advice: [],
      uploadFile: null,
      responseData: null,
      modelLoaded: false,
      modelStatus: '',
      currentDisease: '',
      currentConfidence: 0,
      
      // 配置对话框
      showConfigDialog: false,
      detectionConfig: {
        confidence_threshold: 0.25,
        max_detections: 10,
        iou_threshold: 0.5
      },
      detectionMode: 'balanced',
      
      // 后端API地址 - 根据实际情况修改
      apiBaseUrl: 'http://localhost:5000/api'
    };
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
      // 如果是AI分析页面，检查后端状态
      if (page === 'analysis') {
        this.checkBackendStatus();
      }
    },
    
    logout() {
      // 退出登录逻辑
      console.log('退出登录');
      // 在实际应用中，这里应该清除用户登录状态并跳转到登录页
    },
    
    // 触发文件选择
    triggerFileInput() {
      document.getElementById('cropImage').click();
    },
    
    // 处理图片上传
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      this.uploadFile = file;
      this.originalImage = URL.createObjectURL(file);
      this.resultImage = null;
      this.results = [];
      this.advice = [];
      this.responseData = null;
      this.currentDisease = '';
      this.currentConfidence = 0;
      
      // 重置文件输入，以便可以再次选择相同文件
      event.target.value = '';
    },
    
    // 病害检测
    async detectDisease() {
      if (!this.uploadFile) {
        this.showMessage('请先选择图片', 'warning');
        return;
      }
      
      this.detecting = true;
      this.results = [];
      this.advice = [];
      
      const formData = new FormData();
      formData.append('file', this.uploadFile);
      
      try {
        console.log('🔄 开始发送检测请求...');
        
        // 发送检测请求到后端
        const response = await axios.post(`${this.apiBaseUrl}/detect`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        console.log('✅ 检测响应:', response.data);
        
        this.responseData = response.data;
        this.results = response.data.detections || [];
        this.advice = response.data.advice || [];
        this.resultImage = response.data.result_image;
        this.modelLoaded = response.data.model_used;
        
        // 设置当前检测的病害和置信度
        if (this.results.length > 0) {
          const mainResult = this.results[0];
          this.currentDisease = this.getDiseaseName(mainResult.class);
          this.currentConfidence = mainResult.confidence;
        }
        
        if (this.results.length > 0) {
          this.showMessage(`检测完成！发现 ${this.results.length} 个病害`, 'success');
        } else {
          this.showMessage('未检测到病害，作物可能健康或图片不清晰', 'info');
        }
        
      } catch (error) {
        console.error('❌ 检测请求失败:', error);
        
        // 如果后端不可用，使用模拟数据
        if (error.code === 'ERR_NETWORK') {
          this.useMockDetection();
        } else {
          this.showMessage(`检测失败: ${error.response?.data?.error || error.message}`, 'error');
        }
      } finally {
        this.detecting = false;
      }
    },
    
    // 模拟检测（当后端不可用时使用）
    useMockDetection() {
      console.log('⚠️ 后端不可用，使用模拟检测');
      
      // 模拟检测结果
      const mockDiseases = ['稻瘟病', '白粉病', '叶斑病', '锈病', '健康'];
      const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
      const mockConfidence = 0.7 + Math.random() * 0.25; // 70%-95% 置信度
      
      this.results = [{
        class: randomDisease === '健康' ? 'healthy' : randomDisease,
        confidence: mockConfidence,
        bbox: [100, 100, 50, 50],
        class_id: 0
      }];
      
      this.advice = [{
        disease: randomDisease,
        symptoms: ['叶片出现病斑', '生长受影响'],
        solutions: ['使用推荐农药', '及时清除病叶'],
        prevention: ['加强田间管理', '定期检查'],
        severity: mockConfidence > 0.8 ? 'high' : 'medium',
        confidence: mockConfidence
      }];
      
      // 使用原始图片作为结果图片（因为没有真实检测）
      this.resultImage = this.originalImage;
      this.modelLoaded = false;
      this.currentDisease = randomDisease;
      this.currentConfidence = mockConfidence;
      
      this.showMessage('使用模拟检测（后端服务不可用）', 'warning');
    },
    
    // 检查后端状态
    async checkBackendStatus() {
      try {
        const response = await axios.get(`${this.apiBaseUrl}/status`);
        console.log('🔧 后端状态:', response.data);
        
        this.modelLoaded = response.data.model_loaded;
        this.modelStatus = response.data.model_loaded ? 
          '✅ 模型已加载 - 使用真实AI检测' : 
          '⚠️ 模型未加载 - 使用模拟检测';
        
        this.showMessage(`后端状态正常，模型加载: ${response.data.model_loaded}`, 'success');
      } catch (error) {
        console.error('❌ 后端状态检查失败:', error);
        this.modelStatus = '❌ 后端服务未连接';
        this.modelLoaded = false;
        this.showMessage('后端服务未启动或无法连接，将使用模拟检测', 'warning');
      }
    },
    
    // 获取病害名称
    getDiseaseName(diseaseId) {
      // 如果是中文名称直接返回
      if (['稻瘟病', '白粉病', '叶斑病', '锈病', '健康'].includes(diseaseId)) {
        return diseaseId;
      }
      return diseaseNames[diseaseId] || diseaseId;
    },
    
    // 获取病害描述
    getDiseaseDescription(diseaseName) {
      return diseaseDescriptions[diseaseName] || '该病害的详细描述信息';
    },
    
    // 根据置信度获取严重程度
    getSeverityClass(confidence) {
      if (confidence > 0.8) return 'severe';
      if (confidence > 0.6) return 'medium';
      return 'mild';
    },
    
    // 获取严重程度文本
    getSeverityText(severity) {
      const severityMap = {
        'high': '高',
        'medium': '中', 
        'low': '低',
        'unknown': '未知'
      };
      return severityMap[severity] || '未知';
    },
    
    // 更新检测配置
    updateDetectionConfig() {
      // 这里可以发送配置到后端
      console.log('更新检测配置:', this.detectionConfig, this.detectionMode);
      this.showConfigDialog = false;
      this.showMessage('检测配置已更新', 'success');
    },
    
    // 重置检测配置
    resetDetectionConfig() {
      this.detectionConfig = {
        confidence_threshold: 0.25,
        max_detections: 10,
        iou_threshold: 0.5
      };
      this.detectionMode = 'balanced';
      this.showMessage('检测配置已重置为默认值', 'info');
    },
    
    // 显示消息提示
    showMessage(message, type = 'info') {
      // 在实际应用中可以使用Element Plus的消息提示组件
      // this.$message[type](message);
      console.log(`${type.toUpperCase()}: ${message}`);
      
      // 简单实现一个提示
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
      alertDiv.innerHTML = `
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      `;
      
      // 添加到页面顶部
      const container = document.querySelector('.main-content');
      container.insertBefore(alertDiv, container.firstChild);
      
      // 3秒后自动移除
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.remove();
        }
      }, 3000);
    }
  },
  
  mounted() {
    // 页面加载时检查后端状态
    this.checkBackendStatus();
  }
};
</script>

<style scoped>
/* 基础样式 */
.dashboard {
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 侧边栏样式 */
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #34495e;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo i {
  font-size: 24px;
  color: #2ecc71;
}

.logo h2 {
  margin: 0;
  font-size: 18px;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  flex: 1;
}

.sidebar-menu li a {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.3s;
}

.sidebar-menu li a:hover {
  background-color: #34495e;
  color: white;
}

.sidebar-menu li a.active {
  background-color: #3498db;
  color: white;
}

.sidebar-menu li a i {
  margin-right: 10px;
  width: 20px;
}

.sidebar-footer {
  padding: 15px 20px;
  border-top: 1px solid #34495e;
  font-size: 12px;
  color: #95a5a6;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.top-nav {
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.page-title h1 {
  margin: 0;
  font-size: 24px;
  color: #2c3e50;
}

.page-title p {
  margin: 5px 0 0;
  color: #7f8c8d;
  font-size: 14px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-details .user-name {
  font-weight: bold;
  color: #2c3e50;
}

.user-details .user-role {
  font-size: 12px;
  color: #7f8c8d;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.btn-success {
  background-color: #2ecc71;
  color: white;
}

.btn-success:hover {
  background-color: #27ae60;
}

.btn-success:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.btn-success.loading {
  opacity: 0.7;
}

/* 页面内容 */
.page-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}

.col-3, .col-4, .col-6, .col-8, .col-12 {
  padding: 10px;
}

.col-3 { width: 25%; }
.col-4 { width: 33.33%; }
.col-6 { width: 50%; }
.col-8 { width: 66.66%; }
.col-12 { width: 100%; }

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.card-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  color: #2c3e50;
}

.card-body {
  padding: 20px;
}

.metric-card {
  text-align: center;
  padding: 20px;
}

.metric-card i {
  margin-bottom: 15px;
}

.metric-value {
  font-size: 28px;
  font-weight: bold;
  margin: 10px 0;
}

.metric-label {
  color: #7f8c8d;
  font-size: 14px;
}

/* AI分析页面特定样式 */
.header-actions {
  display: flex;
  gap: 10px;
}

.status-alert {
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.upload-area {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
}

.upload-area:hover {
  border-color: #3498db;
}

.upload-area.has-image {
  border-color: #2ecc71;
  background-color: #f8fff8;
}

.upload-area i {
  color: #95a5a6;
  margin-bottom: 15px;
}

.upload-area p {
  color: #7f8c8d;
  margin: 10px 0;
}

.w-100 {
  width: 100%;
}

.detection-results {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.result-item:last-child {
  border-bottom: none;
}

.disease-tag {
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
}

.disease-tag.severe {
  background-color: #f8d7da;
  color: #721c24;
}

.disease-tag.medium {
  background-color: #fff3cd;
  color: #856404;
}

.disease-tag.mild {
  background-color: #d1ecf1;
  color: #0c5460;
}

.confidence-value {
  font-size: 14px;
  color: #6c757d;
}

.model-info {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #e8f5e9;
  border-radius: 4px;
  font-size: 14px;
  color: #2e7d32;
  display: flex;
  align-items: center;
  gap: 8px;
}

.placeholder-text {
  color: #95a5a6;
  text-align: center;
  padding: 20px;
  font-style: italic;
}

.analysis-result {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.result-header {
  background-color: #f8f9fa;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.disease-name {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
}

.confidence {
  font-size: 16px;
  color: #3498db;
  font-weight: bold;
}

.result-image {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.image-container {
  flex: 1;
  min-width: 300px;
}

.image-placeholder {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-placeholder.empty {
  background-color: #f9f9f9;
}

.image-placeholder i {
  color: #95a5a6;
  margin-bottom: 15px;
}

.preview-img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 4px;
}

.image-label {
  margin-top: 10px;
  font-size: 14px;
  color: #7f8c8d;
}

.result-details {
  padding: 20px;
  border-top: 1px solid #eee;
}

.result-details.placeholder {
  text-align: center;
  color: #95a5a6;
  font-style: italic;
}

.result-details h5 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 10px;
}

.result-details ul {
  padding-left: 20px;
  margin: 10px 0;
}

.result-details li {
  margin-bottom: 5px;
  color: #555;
}

.severity-indicator {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
}

.severity-high {
  background-color: #f8d7da;
  color: #721c24;
}

.severity-medium {
  background-color: #fff3cd;
  color: #856404;
}

.severity-low {
  background-color: #d1ecf1;
  color: #0c5460;
}

.severity-unknown {
  background-color: #e2e3e5;
  color: #383d41;
}

/* 数据表格样式 */
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #2c3e50;
}

.data-table tr:hover {
  background-color: #f5f5f5;
}

/* 状态标签 */
.status {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.status-success {
  background-color: #d4edda;
  color: #155724;
}

.status-warning {
  background-color: #fff3cd;
  color: #856404;
}

.status-info {
  background-color: #d1ecf1;
  color: #0c5460;
}

/* 配置对话框样式 */
.config-tip {
  font-size: 12px;
  color: #6c757d;
  margin-top: 5px;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .sidebar {
    width: 70px;
  }
  
  .logo h2,
  .sidebar-menu span,
  .sidebar-footer {
    display: none;
  }
  
  .logo {
    justify-content: center;
  }
  
  .sidebar-menu li a {
    justify-content: center;
    padding: 15px;
  }
  
  .sidebar-menu li a i {
    margin-right: 0;
    font-size: 18px;
  }
  
  .col-3, .col-4, .col-6, .col-8, .col-12 {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .top-nav {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .user-info {
    flex-direction: column;
    gap: 10px;
  }
}
</style>

<style>
/* Element Plus 组件样式覆盖 */
.el-dialog__header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.el-dialog__title {
  color: #2c3e50;
}

.el-form-item__label {
  color: #555;
}
</style>