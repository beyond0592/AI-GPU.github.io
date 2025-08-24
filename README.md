# AI算力投资平台 (AI Investment Platform)

一个完整的全栈AI算力投资平台，包含用户认证、加密货币支付、投资管理、推荐系统等功能。

## 🚀 功能特性

### 前端功能
- ✅ 响应式设计，支持移动端和桌面端
- ✅ 多语言支持 (中文/英文)
- ✅ 用户注册/登录系统
- ✅ 用户仪表板和资料管理
- ✅ KYC认证流程
- ✅ 投资产品展示和购买
- ✅ 收益统计和历史记录
- ✅ 推荐系统和团队管理
- ✅ 资产管理和交易历史
- ✅ 管理员后台系统

### 后端功能
- ✅ Node.js + Express RESTful API
- ✅ MySQL数据库集成
- ✅ JWT用户认证系统
- ✅ 加密货币支付网关 (CoinGate)
- ✅ 自动收益计算系统
- ✅ 推荐奖励系统
- ✅ 系统日志和监控
- ✅ 数据库事务处理
- ✅ Webhook处理
- ✅ 安全中间件 (Helmet, CORS, 速率限制)

## 📋 技术栈

### 前端
- HTML5 + CSS3 + JavaScript (ES6+)
- Tailwind CSS
- Chart.js (图表)
- 响应式设计

### 后端
- Node.js 16+
- Express.js
- MySQL 8.0+
- JWT认证
- bcryptjs密码加密
- express-validator数据验证

### 支付集成
- CoinGate加密货币支付
- 支持BTC, ETH, USDT, LTC等主流加密货币

### 部署
- Vercel (推荐)
- Railway
- 传统VPS/云服务器

## 🛠️ 安装指南

### 环境要求
- Node.js 16.0 或更高版本
- MySQL 8.0 或更高版本
- npm 或 yarn 包管理器

### 1. 克隆项目
```bash
git clone <repository-url>
cd ai-investment-platform
```

### 2. 安装依赖
```bash
npm install
```

### 3. 数据库设置
1. 创建MySQL数据库:
```sql
CREATE DATABASE ai_investment_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 导入数据库结构:
```bash
mysql -u your_username -p ai_investment_platform < database/schema.sql
```

### 4. 环境配置
复制环境变量模板并配置:
```bash
cp .env.example .env
```

编辑 `.env` 文件，配置以下参数:
```env
# 数据库配置
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=ai_investment_platform
DB_PORT=3306

# JWT配置
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# 服务器配置
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000

# CoinGate支付配置
COINGATE_API_KEY=your_coingate_api_key
COINGATE_API_SECRET=your_coingate_api_secret
COINGATE_ENVIRONMENT=sandbox
COINGATE_WEBHOOK_SECRET=your_webhook_secret

# 安全配置
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 5. 启动开发服务器
```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

服务器将在 `http://localhost:3000` 启动

## 🚀 部署指南

### Vercel部署 (推荐)

1. 安装Vercel CLI:
```bash
npm i -g vercel
```

2. 登录Vercel:
```bash
vercel login
```

3. 部署项目:
```bash
vercel
```

4. 在Vercel控制台配置环境变量 (与.env文件相同的变量)

5. 配置数据库连接 (推荐使用PlanetScale或其他云数据库)

### Railway部署

1. 连接GitHub仓库到Railway
2. 配置环境变量
3. 添加MySQL数据库服务
4. 部署应用

### 传统服务器部署

1. 上传代码到服务器
2. 安装Node.js和MySQL
3. 配置环境变量
4. 使用PM2管理进程:
```bash
npm install -g pm2
pm2 start server.js --name "ai-investment-platform"
pm2 startup
pm2 save
```

## 📚 API文档

### 认证接口
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `POST /api/auth/refresh` - 刷新令牌

### 用户接口
- `GET /api/user/profile` - 获取用户资料
- `PUT /api/user/profile` - 更新用户资料
- `GET /api/user/balance` - 获取用户余额
- `GET /api/user/referrals` - 获取推荐信息

### 交易接口
- `GET /api/transactions` - 获取交易记录
- `POST /api/transactions/deposit` - 创建充值订单
- `POST /api/transactions/withdrawal` - 创建提现申请
- `GET /api/transactions/currencies` - 获取支持的货币

### 投资接口
- `GET /api/investments/products` - 获取投资产品
- `POST /api/investments/invest` - 创建投资
- `GET /api/investments/my-investments` - 获取我的投资
- `GET /api/investments/statistics` - 获取投资统计

### 系统接口
- `GET /api/health` - 健康检查
- `GET /api/info` - 系统信息
- `GET /api/webhook/status` - Webhook状态

## 🔧 配置说明

### 数据库配置
系统使用MySQL数据库，包含以下主要表:
- `users` - 用户信息
- `user_balances` - 用户余额
- `transactions` - 交易记录
- `investment_products` - 投资产品
- `user_investments` - 用户投资
- `earnings` - 收益记录
- `referrals` - 推荐关系
- `system_logs` - 系统日志

### 支付网关配置
支持CoinGate加密货币支付:
1. 注册CoinGate账户
2. 获取API密钥
3. 配置Webhook URL
4. 测试支付流程

### 安全配置
- JWT令牌认证
- 密码bcrypt加密
- CORS跨域保护
- 速率限制
- SQL注入防护
- XSS防护

## 🧪 测试

### 运行测试
```bash
# 运行所有测试
npm test

# 运行特定测试
npm test -- --grep "用户认证"
```

### API测试
使用Postman或其他API测试工具测试接口:
1. 导入API集合
2. 配置环境变量
3. 运行测试用例

## 📊 监控和日志

### 系统监控
- 健康检查: `GET /api/health`
- 系统信息: `GET /api/info`
- Webhook状态: `GET /api/webhook/status`

### 日志系统
- 用户操作日志
- 系统错误日志
- 支付交易日志
- 安全事件日志

## 🔒 安全最佳实践

1. **环境变量**: 敏感信息存储在环境变量中
2. **密码安全**: 使用bcrypt加密存储密码
3. **JWT安全**: 设置合理的过期时间
4. **HTTPS**: 生产环境必须使用HTTPS
5. **数据验证**: 所有输入数据进行验证
6. **速率限制**: 防止API滥用
7. **CORS配置**: 限制跨域访问

## 🐛 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查数据库服务是否运行
   - 验证连接参数
   - 检查防火墙设置

2. **JWT认证失败**
   - 检查JWT_SECRET配置
   - 验证令牌格式
   - 检查令牌过期时间

3. **支付回调失败**
   - 验证Webhook URL配置
   - 检查签名验证
   - 查看支付网关日志

4. **前端API调用失败**
   - 检查CORS配置
   - 验证API端点
   - 查看浏览器控制台错误

### 日志查看
```bash
# 查看应用日志
pm2 logs ai-investment-platform

# 查看错误日志
pm2 logs ai-investment-platform --err

# 实时日志
pm2 logs ai-investment-platform --lines 100
```

## 📈 性能优化

1. **数据库优化**
   - 添加适当索引
   - 使用连接池
   - 查询优化

2. **缓存策略**
   - Redis缓存
   - 静态文件缓存
   - API响应缓存

3. **前端优化**
   - 代码分割
   - 懒加载
   - 图片优化

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 支持

如有问题或需要支持，请:
1. 查看文档和FAQ
2. 搜索已有的Issues
3. 创建新的Issue
4. 联系开发团队

## 🔄 更新日志

### v1.0.0 (2024-08-24)
- ✅ 完整的前端页面系统
- ✅ 后端API系统
- ✅ 用户认证和授权
- ✅ 加密货币支付集成
- ✅ 投资管理系统
- ✅ 推荐系统
- ✅ 管理员后台
- ✅ 多语言支持
- ✅ 响应式设计
- ✅ 部署配置

---

**开发团队**: AI Investment Platform Team  
**最后更新**: 2024年8月24日  
**版本**: 1.0.0
