<template>
  <div class="realtime-container">
    <el-container>
      <el-header style="background: #409EFF; color: white; display: flex; justify-content: space-between; align-items: center;">
        <h2>实时病害检测</h2>
        <div>
          <el-button @click="toggleCamera" :type="cameraActive ? 'danger' : 'success'">
            {{ cameraActive ? '停止检测' : '开启摄像头' }}
          </el-button>
          <el-button @click="$router.push('/detect')">返回图片检测</el-button>
        </div>
      </el-header>
      
      <el-main>
        <el-alert 
          title="实时检测功能说明" 
          type="info"
          description="此功能演示实时视频流检测，实际使用时需要连接摄像头硬件"
          show-icon
          style="margin-bottom: 20px">
        </el-alert>
        
        <el-row :gutter="20">
          <el-col :span="16">
            <el-card header="实时检测画面">
              <div class="video-container">
                <img 
                  v-if="cameraActive" 
                  :src="videoUrl" 
                  alt="实时检测"
                  class="video-feed" />
                <div v-else class="camera-placeholder">
                  <el-empty description="摄像头未开启">
                    <el-button type="primary" @click="toggleCamera">
                      开启摄像头
                    </el-button>
                  </el-empty>
                </div>
              </div>
              
              <div class="controls" v-if="cameraActive">
                <el-slider
                  v-model="detectionConfidence"
                  :min="0.1"
                  :max="1"
                  :step="0.1"
                  show-stops
                  style="width: 200px; margin-right: 20px;"
                  :format-tooltip="value => `置信度: ${value}`">
                </el-slider>
                
                <el-button-group>
                  <el-button 
                    @click="captureFrame"
                    :disabled="!cameraActive">
                    📸 捕捉当前帧
                  </el-button>
                  <el-button 
                    @click="toggleRecording"
                    :type="isRecording ? 'danger' : 'warning'">
                    {{ isRecording ? '⏹️ 停止录制' : '⏺️ 开始录制' }}
                  </el-button>
                  <el-button 
                    @click="showDetectionSettings"
                    type="info">
                    ⚙️ 检测设置
                  </el-button>
                </el-button-group>
              </div>
            </el-card>
          </el-col>
          
          <el-col :span="8">
            <el-card header="检测信息" class="info-card">
              <div class="stats-panel">
                <div class="stat-item">
                  <el-statistic title="运行状态" :value="cameraActive ? '运行中' : '已停止'" />
                </div>
                <div class="stat-item">
                  <el-statistic 
                    title="检测帧数" 
                    :value="frameCount"
                    :value-style="{ color: '#409EFF' }" />
                </div>
                <div class="stat-item">
                  <el-statistic 
                    title="检测到病害" 
                    :value="currentDiseases.length"
                    :value-style="{ color: currentDiseases.length > 0 ? '#F56C6C' : '#67C23A' }" />
                </div>
              </div>
              
              <el-divider></el-divider>
              
              <div class="current-detections">
                <h4>🔍 当前检测到的病害：</h4>
                <div v-if="currentDiseases.length > 0" class="detections-list">
                  <div 
                    v-for="(disease, index) in currentDiseases" 
                    :key="index"
                    class="detection-item">
                    <el-tag 
                      :type="getSeverityType(disease.confidence)"
                      size="large"
                      class="disease-tag">
                      {{ disease.name }}
                    </el-tag>
                    <div class="confidence-bar">
                      <div class="confidence-label">置信度: {{ (disease.confidence * 100).toFixed(1) }}%</div>
                      <el-progress 
                        :percentage="disease.confidence * 100" 
                        :stroke-width="8"
                        :color="getProgressColor(disease.confidence)"
                        :show-text="false" />
                    </div>
                  </div>
                </div>
                <div v-else class="no-detection">
                  <el-empty description="未检测到病害" :image-size="80"></el-empty>
                </div>
              </div>
              
              <el-divider></el-divider>
              
              <div class="quick-actions">
                <h4>🚀 快速操作：</h4>
                <el-button-group style="display: flex; flex-direction: column; gap: 10px;">
                  <el-button 
                    type="primary" 
                    @click="showDiseaseHandbook"
                    style="width: 100%">
                    📚 查看病害手册
                  </el-button>
                  <el-button 
                    type="success" 
                    @click="exportReport"
                    style="width: 100%">
                    📊 导出检测报告
                  </el-button>
                  <el-button 
                    type="warning" 
                    @click="showHelp"
                    style="width: 100%">
                    ❓ 使用帮助
                  </el-button>
                </el-button-group>
              </div>
            </el-card>
            
            <el-card header="📈 检测历史" style="margin-top: 20px;">
              <div class="history-panel">
                <el-timeline>
                  <el-timeline-item
                    v-for="(record, index) in detectionHistory"
                    :key="index"
                    :timestamp="record.time"
                    :type="getHistoryItemType(record.confidence)"
                    :size="record.confidence > 0.8 ? 'large' : 'normal'">
                    <div class="history-item">
                      <span class="disease-name">{{ record.disease }}</span>
                      <span class="confidence-value">{{ (record.confidence * 100).toFixed(1) }}%</span>
                    </div>
                  </el-timeline-item>
                </el-timeline>
                
                <div v-if="detectionHistory.length === 0" class="no-history">
                  <el-empty description="暂无检测历史" :image-size="60"></el-empty>
                </div>
                
                <div v-else class="history-controls">
                  <el-button 
                    size="small" 
                    @click="clearHistory"
                    type="danger"
                    plain>
                    清空历史
                  </el-button>
                  <el-button 
                    size="small" 
                    @click="exportHistory"
                    type="primary"
                    plain>
                    导出历史
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    
    <!-- 检测设置对话框 -->
    <el-dialog v-model="settingsDialogVisible" title="检测设置" width="500px">
      <el-form label-width="120px">
        <el-form-item label="检测置信度">
          <el-slider
            v-model="detectionConfidence"
            :min="0.1"
            :max="1"
            :step="0.05"
            show-stops>
          </el-slider>
          <div style="text-align: center; color: #666;">
            当前: {{ (detectionConfidence * 100).toFixed(1) }}%
          </div>
        </el-form-item>
        
        <el-form-item label="检测频率">
          <el-radio-group v-model="detectionFrequency">
            <el-radio :label="1">高频 (1秒/次)</el-radio>
            <el-radio :label="2">中频 (2秒/次)</el-radio>
            <el-radio :label="5">低频 (5秒/次)</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="警报阈值">
          <el-select v-model="alertThreshold" placeholder="请选择">
            <el-option label="高 (>80%)" value="high"></el-option>
            <el-option label="中 (>60%)" value="medium"></el-option>
            <el-option label="低 (>40%)" value="low"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="settingsDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveSettings">保存设置</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RealTimeDetection',
  data() {
    return {
      cameraActive: false,
      isRecording: false,
      videoUrl: '',
      frameCount: 0,
      currentDiseases: [],
      detectionHistory: [],
      detectionConfidence: 0.5,
      detectionFrequency: 2,
      alertThreshold: 'medium',
      detectionInterval: null,
      historyInterval: null,
      settingsDialogVisible: false
    }
  },
  methods: {
    toggleCamera() {
      if (this.cameraActive) {
        this.stopCamera()
      } else {
        this.startCamera()
      }
    },
    
    startCamera() {
      this.cameraActive = true
      this.videoUrl = 'http://localhost:5000/api/realtime_feed'
      this.frameCount = 0
      
      // 模拟实时检测更新
      this.detectionInterval = setInterval(() => {
        this.frameCount++
        this.simulateDetection()
      }, this.detectionFrequency * 1000)
      
      // 历史记录更新
      this.historyInterval = setInterval(() => {
        if (this.currentDiseases.length > 0) {
          this.updateHistory()
        }
      }, 5000)
      
      this.$message.success('摄像头已开启，开始实时检测')
    },
    
    stopCamera() {
      this.cameraActive = false
      this.isRecording = false
      this.videoUrl = ''
      this.currentDiseases = []
      this.frameCount = 0
      
      if (this.detectionInterval) {
        clearInterval(this.detectionInterval)
        this.detectionInterval = null
      }
      
      if (this.historyInterval) {
        clearInterval(this.historyInterval)
        this.historyInterval = null
      }
      
      this.$message.info('摄像头已关闭')
    },
    
    simulateDetection() {
      // 模拟随机检测结果
      const diseases = [
        { name: '稻瘟病', confidence: 0.85, severity: 'high' },
        { name: '白粉病', confidence: 0.76, severity: 'medium' },
        { name: '叶斑病', confidence: 0.68, severity: 'medium' },
        { name: '锈病', confidence: 0.92, severity: 'high' },
        { name: '健康', confidence: 0.95, severity: 'low' }
      ]
      
      // 根据置信度阈值过滤
      const filteredDiseases = diseases.filter(
        disease => disease.confidence >= this.detectionConfidence
      )
      
      // 随机选择1-2个病害显示
      const randomCount = Math.floor(Math.random() * 2) + 1
      this.currentDiseases = this.shuffleArray(filteredDiseases).slice(0, randomCount)
      
      // 如果置信度足够高，显示警告
      if (this.currentDiseases.some(d => d.confidence > 0.8 && d.name !== '健康')) {
        this.showAlert(this.currentDiseases[0])
      }
    },
    
    shuffleArray(array) {
      // 随机打乱数组
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    },
    
    updateHistory() {
      if (this.currentDiseases.length > 0) {
        const mainDisease = this.currentDiseases[0]
        this.detectionHistory.unshift({
          disease: mainDisease.name,
          confidence: mainDisease.confidence,
          time: new Date().toLocaleTimeString()
        })
        
        // 只保留最近20条记录
        if (this.detectionHistory.length > 20) {
          this.detectionHistory = this.detectionHistory.slice(0, 20)
        }
      }
    },
    
    showAlert(disease) {
      if (disease.confidence > 0.8 && disease.name !== '健康') {
        this.$notify({
          title: '🚨 检测到高置信度病害',
          message: `发现 ${disease.name}，置信度 ${(disease.confidence * 100).toFixed(1)}%`,
          type: 'warning',
          duration: 3000
        })
      }
    },
    
    captureFrame() {
      if (this.cameraActive) {
        this.$message.success('当前帧已捕捉并保存')
        // 在实际应用中，这里会实现截图保存功能
      } else {
        this.$message.warning('请先开启摄像头')
      }
    },
    
    toggleRecording() {
      this.isRecording = !this.isRecording
      this.$message[this.isRecording ? 'success' : 'info'](
        this.isRecording ? '开始录制视频' : '停止录制'
      )
    },
    
    showDetectionSettings() {
      this.settingsDialogVisible = true
    },
    
    saveSettings() {
      this.settingsDialogVisible = false
      
      // 重启检测间隔以应用新的频率设置
      if (this.cameraActive) {
        clearInterval(this.detectionInterval)
        this.detectionInterval = setInterval(() => {
          this.frameCount++
          this.simulateDetection()
        }, this.detectionFrequency * 1000)
      }
      
      this.$message.success('设置已保存')
    },
    
    showDiseaseHandbook() {
      this.$message.info('打开病害手册（功能开发中）')
    },
    
    exportReport() {
      this.$message.success('检测报告已导出（功能开发中）')
    },
    
    showHelp() {
      this.$message.info('将摄像头对准植物叶片，系统会自动检测病害并提供解决方案')
    },
    
    clearHistory() {
      this.detectionHistory = []
      this.$message.success('检测历史已清空')
    },
    
    exportHistory() {
      this.$message.success('检测历史已导出（功能开发中）')
    },
    
    getSeverityType(confidence) {
      if (confidence > 0.8) return 'danger'
      if (confidence > 0.6) return 'warning'
      return 'success'
    },
    
    getProgressColor(confidence) {
      if (confidence > 0.8) return '#F56C6C'
      if (confidence > 0.6) return '#E6A23C'
      return '#67C23A'
    },
    
    getHistoryItemType(confidence) {
      if (confidence > 0.8) return 'danger'
      if (confidence > 0.6) return 'warning'
      return 'success'
    }
  },
  
  beforeUnmount() {
    this.stopCamera()
  }
}
</script>

<style scoped>
.realtime-container {
  height: 100vh;
  background: #f5f7fa;
}

.video-container {
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.video-feed {
  width: 100%;
  height: 480px;
  object-fit: contain;
}

.camera-placeholder {
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
}

.controls {
  margin-top: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info-card {
  height: 100%;
}

.stats-panel {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.current-detections {
  min-height: 200px;
}

.detections-list {
  max-height: 300px;
  overflow-y: auto;
}

.detection-item {
  display: flex;
  align-items: center;
  margin: 15px 0;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #409EFF;
}

.disease-tag {
  margin-right: 15px;
  min-width: 80px;
  text-align: center;
}

.confidence-bar {
  flex: 1;
}

.confidence-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.no-detection {
  text-align: center;
  color: #909399;
  padding: 40px 20px;
}

.quick-actions {
  text-align: center;
}

.history-panel {
  max-height: 300px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.disease-name {
  font-weight: bold;
}

.confidence-value {
  color: #409EFF;
  font-family: 'Courier New', monospace;
}

.no-history {
  text-align: center;
  padding: 20px;
  color: #909399;
}

.history-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ebeef5;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .stats-panel {
    flex-direction: column;
    gap: 15px;
  }
  
  .controls {
    flex-direction: column;
    gap: 15px;
  }
}

/* 滚动条样式 */
.detections-list::-webkit-scrollbar,
.history-panel::-webkit-scrollbar {
  width: 6px;
}

.detections-list::-webkit-scrollbar-track,
.history-panel::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.detections-list::-webkit-scrollbar-thumb,
.history-panel::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.detections-list::-webkit-scrollbar-thumb:hover,
.history-panel::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>