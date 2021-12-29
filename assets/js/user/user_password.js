$(() => {
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePassword: (value) => {
            if (value === $("[name=oldPassword]").val()) {
                return "新旧密码相同,请重新输入!";
            }
        },
        confirmPassword: (value) => {
            if (value !== $("[name=newPassword]").val()) {
                return "新密码两次输入不一致,请重新输入!";
            }
        }
    })

    // 发起重置密码请求
    $("#changePassword").on("click", (e) => {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "http://api-breakingnews-web.itheima.net/my/updatepwd",
            data: $(".layui-form").serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("修改密码失败");
                }
                layer.msg("修改密码成功");

                // 修改密码成功后重置表单
                $(".layui-form")[0].reset();

            }
        })
    })
    /* 出现跨域问题,未解决 */
})