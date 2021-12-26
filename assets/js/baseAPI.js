// 每次调用$.get() | $.post | $.ajax时，会先调用ajaxPrefilter这个函数

$.ajaxPrefilter((options) => {
    // console.log(options.url);
    // options.url = options.url;

    // 统一为有权限的接口设置headers请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || "",
        }
    }
    // 全局同意挂载complete函数
    // 无论请求成功或者失败，都会执行complete函数
    options.complete = (res) => {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1.强制清空token
            localStorage.removeItem("token");

            // 2.强制跳转到登录页面
            location.href = "/login.html";
        }
    }
})