$(() => {
    const layer = layui.layer;
    // 查询参数对象
    let queryData = {
        pagenum: 1, // 页码值
        pagesize: 2, // 指定每页显示多少条数据,默认显示2条
        cate_id: "", // 文章分类的id
        state: "",// 文章的发布状态
    }
    getArticleListData();
    //  获取文章列表数据
    function getArticleListData() {
        $.ajax({
            method: "GET",
            url: "http://api-breakingnews-web.itheima.net/my/article/list",
            data: queryData,
            success: (res) => {
                if (res.status !== 0) {
                    console.log(res.status);
                    return layer.msg("获取文章列表失败");
                }
                let strHtml = template("tpl-table", res);
                $("tbody").html(strHtml);

                // !!!!!!!!!!!!!!不能正常获取文章列表数据
            }
        })
    }
})