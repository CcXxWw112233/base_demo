import * as singleSpa from "single-spa"

/**
 * 加载子项目的js文件
 * @param {string} url 加载js的url路径 
 */
const runScript = (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(script, firstScript)
    })
}

// 使用singleSpa.registerApplication()进行服务的注册 
// 参数1: 注册服务的名称
// 参数2: 加载子项目中的文件(就是使用webpack打包好后的文件)
// 参数3: 调起该项目的加载路由
singleSpa.registerApplication(
    'app1',
    async () => {
        await runScript("http://localhost:8802/js/chunk-vendors.js")
        await runScript("http://localhost:8802/js/app.js");
        return window.app1;
    },
    location => location.hash.startsWith("#/app1")
)
//启动服务
export default singleSpa