const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/assets/sass/_variables.scss";
                    @import "@/assets/sass/_mixin.scss";
                    @import "@/assets/sass/_opt-default.scss";
                    @import "@/assets/sass/_normalize.scss";
                `,
            }
        }
    },
    publicPath: process.env.BASE_URL,             // 실제 서비스 될 루트 경로 설정 (env세팅에 따름 : '/styleship/')
    outputDir: 'dist/styleship'              // 아웃풋($ yarn serveemd...)의 경로 설정 (env세팅에 따름 : '/styleship/')
});


/*
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
    @import "@/assets/sass/_variables.scss";
    @import "@/assets/sass/_mixin.scss";
  `
            }
        }
    }
}*/