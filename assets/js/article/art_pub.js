$(() => {
    const layer = layui.layer;
    const form = layui.form;
    initCate();

    // 初始化富文本编辑器
    initEditor();


    // 加载文章分类数据
    function initCate() {
        $.ajax({
            method: "GET",
            url: "http://api-breakingnews-web.itheima.net/my/article/cates",
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("初始化文章分类数据失败");
                }

                // 使用模板引擎渲染分类下拉菜单
                let htmlStr = template("tpl-cate", res);
                $("[name=cate_id]").html(htmlStr);
                form.render(); // layui表单渲染
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 给选择封面的按钮绑定点击事件
    $("#btnChooseImage").on("click", () => {
        $("#coverFile").click();
    })

    // 监听coverFile文件上传的change事件,获取用户选择的文件列表
    $("#coverFile").on("change", (e) => {
        // 获取到的文件列表数组
        let files = e.target.files;
        if (files.length === 0) {
            return layer.msg("请选择图片!");
        }

        let newImageUrl = URL.createObjectURL(files[0]);

        // 为裁剪区域重新设置图片
        $image
            .cropper("destroy") // 销毁旧的裁剪区
            .attr("src", newImageUrl) // 重新设置图片路径
            .cropper(options); // 初始化裁剪区
    })

    // 定义文章的发布状态
    let art_state = "已发布";
    $(".btn-save").on("click", () => {
        art_state = "草稿";
    })

    // 为表单绑定submit提交事件
    $("#form-pub").on("submit", (e) => {
        e.preventDefault();

        // 基于#form-pub 表单创建formData对象
        let fd = new FormData($("#form-pub")[0]);

        // 把发布状态添加到formData中
        fd.append("state", art_state);

        // 将裁剪后的图片输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                fd.append("cover_img", blob);

                // 发起ajax请求,发表文章
                publishArticle(fd);
            })
        function publishArticle() {
            $.ajax({
                method: "POST",
                url:"http://api-breakingnews-web.itheima.net/my/article/add",
                data: fd,  // 如果向服务器提交的是formData格式的数据,必须添加以下两个配置项
                contentType: false,
                processData: false,
                success: (res) => {
                    if (res.status !== 0) {
                        return layer.msg("发布文章失败")
                    }
                    layer.msg("发布文章成功");
                    
                     // 发布成功后跳转到文章列表页面
                    location.href = "/article/art_list.html"
                }
            })
        }
    })
})