$(() => {
    let layer = layui.layer;
    form.verify({
        nickname: (value) => {
            if (value.length > 12) {
                return "昵称长度必须在1~6个字符之间";
            }
        }
    })

    initUserInfo();
})

let form = layui.form;
// 初始化用户基本信息
function initUserInfo() {
    $.ajax({
        method: "GET",
        url: "http://api-breakingnews-web.itheima.net/my/userinfo",
        success: (res) => {
            if (res.status !== 0) {
                return layer.msg("获取用户信息失败");
            }
            // console.log(res);
            form.val("formUserInfo", res.data);

        }
    })
}


// 重置表单数据
$("#btnReset").on("click", (e) => {
    // 阻止表单默认重置行为
    e.preventDefault();
    initUserInfo();
})


// 监听表单的提交事件
$(".layui-form").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
        method: "POST",
        url: "http://api-breakingnews-web.itheima.net/my/userinfo",
        data: $(".layui-form").serialize(),
        success: (res) => {
            if (res.status !== 0) {
                return layer.msg("用户信息修改失败")
            }
            // console.log(res);
            layer.msg("用户信息修改成功");

            // 調用index.js文件中的getUserInfo方法
            window.parent.getUserInfo();
        }
    })
})
