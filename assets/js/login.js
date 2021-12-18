$(() => {
    // 点击去注册账号的链接
    $("#link_reg").on("click", () => {
        $(".login-box").hide();
        $(".reg-box").show();
    })

    // 点击去登录的链接
    $("#link_login").on("click", () => {
        $(".login-box").show();
        $(".reg-box").hide();
    })

    // 表单验证
    // 从layui中获取form对象
    let form = layui.form;
    let layer = layui.layer;

    // 通过form.verify 函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: (value) => {
            // 形参拿到的时确认密码框的value
            let pwd = $(".reg-box [name=password]").val()
            // 判断两次输入是否一致
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })

    // 监听注册表单的提交事件
    $("#form_reg").on("submit", (e) => {
        e.preventDefault();
        let data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        }
        $.post(
            "http://api-breakingnews-web.itheima.net/api/reguser",
            data,
            (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功，请登录~")

                // 注册成功后，自动调用#link_login点击事件，切换到登录界面
                $("#link_login").click();
            }
        )
    })

    // 监听邓伦表单提交事件
    $("#form_login").submit((e) => {
        e.preventDefault();
        $.ajax({
            url: "http://api-breakingnews-web.itheima.net/api/login",
            method: "POST",
            // 快速获取表单数据
            data: $("#form_login").serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("登录失败");
                }
                // console.log(res.token);

                // 将获取到的token值保存到localStorage中
                localStorage.setItem("token", res.token)

                // 登录成功后跳转到后台主页
                // location.href = "/index.html";
            }
        })
    })
})