$(() => {
    const layer = layui.layer;
    getUserInfo();

    // 退出登录
    $("#btnLogout").on("click", () => {
        layer.confirm("确定退出登录吗？", { icon: 3, title: "退出登录" }, (confirm) => {
            // 1.清除localStorage中保存的token
            localStorage.removeItem("token");

            // 2.重新跳转到登录页面
            location.href = "/login.html"

            // 3.关闭confirm询问框
            layer.close(confirm);
        })
    })
})

// 请求用户信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "http://api-breakingnews-web.itheima.net/my/userinfo",
        success: (res) => {
            if (res.status !== 0) {
                return layer.msg("获取用户信息失败");
            }
            renderAvatar(res.data);
        },
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    let name = user.nickname || user.username;
    $(".welcome").html("欢迎&nbsp;" + name);

    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img")
            .attr("src", user.user_pic)
            .show();
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide();
        let first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}


