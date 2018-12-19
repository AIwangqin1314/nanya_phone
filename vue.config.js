module.exports = {
    devServer: {
        // 设置代理
        proxy: {
            '/api': {
                // 目标 API 地址
                target: 'http://nxha.ynnsd.com/api/v1/Nymc/index.aspx',
                // 如果要代理 websockets
                ws: true,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                //这个必须写啊。。。。（我也不知道为啥，不写就错了）
                pathRewrite:{
                    '^/api':'/api'
                }
            }
        }
    }
}
