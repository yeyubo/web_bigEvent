$(() => {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 文件上传  当上传按钮被点击时,触发file文件上传的点击事件
    $("#btnChooseImage").on("click", () => {
        $("#file").click();
    })


    // 给文件选择框绑定change事件
    $("#file").on("change", (e) => {
        const layer = layui.layer;
        let fileList = e.target.files;
        if (fileList.length === 0) {
            return layer.msg("请选择照片!");
        }

        // 1.获取用户选择的图片
        let file = e.target.files[0];

        // 2.将文件转换成路径
        let newImgURL = URL.createObjectURL(file);

        // 3.重新初始化裁剪区域
        $image
            .cropper("destroy") // 销毁旧的裁剪区
            .attr("src", newImgURL) // 重新设置图片路径
            .cropper(options); // 初始化裁剪区
    })


    // 将裁剪后的头像上传到服务器
    $("#btnUpload").on("click", () => {

        //  1.获取裁剪后的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 2.向服务器提交裁剪后的图片
        $.ajax({
            method: "POST",
            url: "http://api-breakingnews-web.itheima.net/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: (res) => {
                if (res.status !== 0) {
                    console.log(res.status);
                    return layer.msg("更换头像失败!");
                }
                layer.msg("更换头像成功~")

                // 调用父窗口中的getUserInfo()渲染头像
                window.parent.getUserInfo();
            }
        })
    })

})