const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// 导入数据库和服务
const { testConnection } = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transaction');
const investmentRoutes = require('./routes/investment');
const webhookRoutes = require('./routes/webhook');

const app = express();
const PORT = process.env.PORT || 3000;

// 安全中间件
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com", "https://cdnjs.cloudflare.com", "https://unpkg.com"],
            imgSrc: ["'self'", "data:", "https:", "http:"],
            fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
            connectSrc: ["'self'", "https://api.coingate.com", "https://api-sandbox.coingate.com"]
        }
    }
}));

// CORS配置
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// 速率限制
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15分钟
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 限制每个IP 100个请求
    message: {
        error: 'Too many requests from this IP, please try again later.',
        code: 'RATE_LIMIT_EXCEEDED'
    },
    standardHeaders: true,
    legacyHeaders: false
});

app.use('/api', limiter);

// 解析JSON和URL编码的请求体
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));
app.use('/design_iterations', express.static(path.join(__dirname, 'design_iterations')));

// API路由
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/webhook', webhookRoutes);

// 健康检查端点
app.get('/api/health', async (req, res) => {
    try {
        const dbStatus = await testConnection();
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            database: dbStatus ? 'Connected' : 'Disconnected',
            environment: process.env.NODE_ENV || 'development'
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            timestamp: new Date().toISOString(),
            error: error.message
        });
    }
});

// API信息端点
app.get('/api/info', (req, res) => {
    res.json({
        name: 'AI Investment Platform API',
        version: '1.0.0',
        description: 'AI算力投资平台后端API',
        endpoints: {
            auth: '/api/auth',
            user: '/api/user',
            transactions: '/api/transactions',
            investments: '/api/investments',
            webhook: '/api/webhook'
        },
        features: [
            'User Authentication (JWT)',
            'Crypto Payment Gateway',
            'Multi-language Support',
            'Investment Management',
            'Transaction History',
            'KYC Verification'
        ]
    });
});

// 前端路由 - 服务静态HTML文件
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'design_iterations', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'design_iterations', 'ai_investment_login_1.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'design_iterations', 'ai_investment_dashboard_1.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'design_iterations', 'ai_investment_profile_1.html'));
});

app.get('/kyc', (req, res) => {
    res.sendFile(path.join(__dirname, 'design_iterations', 'ai_investment_kyc_1.html'));
});

app.get('/assets', (req, res) => {
    res.sendFile(path.join(__dirname, 'design_iterations', 'ai_investment_assets_1.html'));
});

// 404处理
app.use('*', (req, res) => {
    if (req.originalUrl.startsWith('/api/')) {
        res.status(404).json({
            error: 'API endpoint not found',
            path: req.originalUrl,
            method: req.method
        });
    } else {
        res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }
});

// 全局错误处理
app.use((error, req, res, next) => {
    console.error('Global Error Handler:', error);
    
    // 数据库错误
    if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
            error: 'Duplicate entry',
            message: 'The provided data already exists'
        });
    }
    
    // JWT错误
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Invalid token',
            message: 'Please login again'
        });
    }
    
    // 验证错误
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation failed',
            message: error.message
        });
    }
    
    // 默认错误
    res.status(error.status || 500).json({
        error: error.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
});

// 启动服务器
async function startServer() {
    try {
        // 测试数据库连接
        console.log('🔄 正在测试数据库连接...');
        const dbConnected = await testConnection();
        
        if (!dbConnected) {
            console.error('❌ 数据库连接失败，服务器启动中止');
            process.exit(1);
        }
        
        // 启动HTTP服务器
        app.listen(PORT, () => {
            console.log('🚀 AI Investment Platform Server Started');
            console.log(`📍 Server running on port ${PORT}`);
            console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 Local URL: http://localhost:${PORT}`);
            console.log(`📚 API Documentation: http://localhost:${PORT}/api/info`);
            console.log(`💊 Health Check: http://localhost:${PORT}/api/health`);
            console.log('✅ Server is ready to accept connections');
        });
        
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

// 优雅关闭
process.on('SIGTERM', () => {
    console.log('🔄 SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🔄 SIGINT received, shutting down gracefully');
    process.exit(0);
});

// 未捕获的异常处理
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// 启动服务器
startServer();

module.exports = app;
