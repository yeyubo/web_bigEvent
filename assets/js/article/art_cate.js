$(() => {
    const layer = layui.layer;
    const form = layui.form;
    initArtCateList();
    $("#btnAddCate").on("click", addCate);
    addCatePost();
    editPopup();

    // 获取并初始化文章列表
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "http://api-breakingnews-web.itheima.net/my/article/cates",
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败");
                }

                // 渲染文章列表
                let strHtml = template("tpl-table", res);
                $("tbody").html(strHtml);
            }
        })
    }

    let addIndex = null;  // 弹出层索引

    // layui弹出层
    function addCate() {
        addIndex = layer.open({
            type: 1, // 页面
            area: ["420px", "230px"], //size
            title: "添加文章分类",
            content: $("#dialog-add").html()
        })
    }


    // 文章分类提交功能
    function addCatePost() {
        // 注意:因为"form-add"只有弹出层弹出时才存在的元素,所以不能直接给form-add绑定事件,需要通过事件代理
        $("body").on("submit", "#form-add", (e) => {
            e.preventDefault();
            $.ajax({
                method: "POST",
                url: "http://api-breakingnews-web.itheima.net/my/article/addcates",
                data: $("#form-add").serialize(),
                success: (res) => {
                    if (res.status !== 0) {
                        console.log(res.message);
                        layer.msg("新增文章分类失败!")
                        layer.close(addIndex);
                    }

                    /* 添加类别失败,貌似后端接口可添加数据达到上限 */
                    /* layer.msg("新增分类成功");
                    initArtCateList(); */
                }
            })
        })
    }

    // 编辑按钮展示修改文章分类弹出层
    let indexEdit = null;
    function editPopup() {
        $("tbody").on("click", ".btn-edit", () => {
            indexEdit = layer.open({
                type: 1, // 页面
                area: ["420px", "230px"], // size
                title: "修改文章分类",
                content: $("#dialog-edit").html()
            })

            // 通过自定义属性获取对应数据id   {id获取有问题}
            let max = 9;
            let min = 6;
            let idNum = Math.floor(min + Math.random() * (max - min));
            let id = Number(Math.abs($(".btn-edit").attr("data-id")).toString().substr(idNum));
            // 请求id对应的数据
            $.ajax({
                method: "GET",
                url: "http://api-breakingnews-web.itheima.net/my/article/cates/" + id,
                success: (res) => {
                    form.val("form-edit", res.data);
                }
            })
        })
    }

    // 更新文章分类数据
    $("body").on("click", "#form-edit", (event) => {
        event.preventDefault();
        $.ajax({
            method: "POST",
            url: "http://api-breakingnews-web.itheima.net/my/article/updatecate",
            data: $("#form-edit").serialize(),
            success: (res) => {
                // 数据不能正常提交!!!
                if (res.status !== 0) {
                    layer.msg("更新分类数据失败")
                    layer.close(indexEdit);
                }
            }
        })
    })

    // 文章删除功能无法完成,因为删除的对应id无法获取到!!!
})


