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
      `
            }
        }
    }
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